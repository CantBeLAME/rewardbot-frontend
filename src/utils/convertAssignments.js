import {
	PlannerAssignmentDefaults,
	AssignmentDefaults,
	AssignmentType,
	AssignmentStatus,
} from "../const/assignments";

function isValidDate(datestr) {
	const date = new Date(datestr);
	return date.toString() !== "Invalid Date" && !isNaN(date.valueOf());
}

// Use default values from 'full', only filling in values from 'partial' that are not null/undefined
export function mergePartial(partial, full) {
	const ret = {
		...full,
	};
	Object.keys(partial).forEach((k) => {
		const prop = k;
		if (partial[prop] !== null && typeof partial[prop] !== "undefined")
			ret[prop] = partial[prop];
	});
	return ret;
}

/* Merge api objects into Assignment objects. */
export function convertPlannerAssignments(assignments) {
	assignments = assignments.map((assignment) =>
		mergePartial(assignment, PlannerAssignmentDefaults),
	);

	return assignments.map((assignment) => {
		const converted = {
			html_url:
				assignment.html_url ||
				assignment.plannable.linked_object_html_url,
			type: assignment.plannable_type,
			id: assignment.plannable.assignment_id // for quizzes, use this id to query graphql
				? assignment.plannable.assignment_id.toString()
				: assignment.plannable_id?.toString(),
			plannable_id: assignment.plannable_id?.toString(), // just in case it changes in the future
			override_id: assignment.planner_override?.id.toString(),
			course_id: assignment.plannable.course_id
				? assignment.plannable.course_id.toString()
				: assignment.course_id
					? assignment.course_id.toString()
					: "0",
			context_type: assignment.context_type,
			context_name: assignment.context_name,
			name: assignment.plannable.title,
			due_at:
				assignment.plannable.due_at ||
				assignment.plannable.todo_date ||
				assignment.plannable_date,
			points_possible: assignment.plannable.points_possible,
			submition_status: assignment.submissions
				? assignment.submissions.submitted
					? assignment.submissions.late
						? AssignmentStatus.LATE
						: AssignmentStatus.COMPLETE
					: assignment.submissions.missing
						? AssignmentStatus.MISSING
						: assignment.submissions.graded
							? AssignmentStatus.COMPLETE
							: AssignmentStatus.NOSUBMISSION
				: AssignmentStatus.NOSUBMISSION,
			graded: assignment.submissions
				? assignment.submissions.excused ||
					assignment.submissions.graded
				: undefined,
			graded_at: assignment.submissions
				? assignment.submissions.posted_at
				: undefined,
			marked_complete:
				assignment.planner_override?.marked_complete ||
				assignment.submissions?.submitted ||
				assignment.submissions?.graded ||
				assignment.planner_override?.dismissed ||
				(assignment.plannable_type === AssignmentType.ANNOUNCEMENT &&
					assignment.plannable.read_state === "read"),
			submissions: assignment.submissions,
		};

		if (
			assignment.plannable_type === AssignmentType.NOTE &&
			assignment.plannable.details
		) {
			const parsed = assignment.plannable.details.split("\n");
			// custom task with details
			if (
				parsed.length >= 2 &&
				parsed[0].trim() === "Created using Tasks for Canvas"
			) {
				if (parsed[1].trim() === "Instructor Note") {
					converted.needs_grading_count = 1;
					converted.total_submissions = 1;
				}
				// in case the user added other details after
				try {
					if (parsed.length >= 3)
						converted.html_url = parsed[2].split(" ")[0].trim();
					if (
						parsed.length >= 4 &&
						(!converted.course_id || converted.course_id === "0")
					)
						converted.course_id = parsed[3].split(" ")[0].trim();
				} catch {
					converted.html_url = "/";
					converted.course_id = converted.course_id || "0";
				}
			}
		}

		const full = mergePartial(converted, AssignmentDefaults);

		// critical properties
		if (!isValidDate(full.due_at)) full.due_at = new Date().toISOString();
		if (!full.course_id) full.course_id = "0";

		return full;
	});
}

export async function convertSubmission(assignments) {
	try {
		return assignments.map((assignment) => {
			const type = assignment.quiz_id
				? AssignmentType.QUIZ
				: AssignmentType.ASSIGNMENT;
			const submission = assignment?.submission;
			// console.log("Submission:", submission);
			const converted = {
				id:
					(type === AssignmentType.QUIZ
						? submission?.quiz_submissions[0]?.id
						: submission?.id) ?? 0,
				user_id: submission?.user.user_id ?? 0,
				course_id: Number(assignment?.course_id ?? 0),
				assignment_id: Number(assignment?.id ?? 0),
				submitted_at:
					type === AssignmentType.QUIZ
						? submission.quiz_submissions.reduce(
								(latest, current) => {
									if (!current?.finished_at) return latest;
									return new Date(latest?.finished_at) >
										new Date(current.finished_at)
										? latest
										: current;
								},
								null,
							)?.finished_at
						: (submission?.submitted_at ?? null),
				type: type,
				submitted:
					type === AssignmentType.QUIZ
						? submission.quiz_submissions.reduce(
								(latest, current) => {
									return current.finished_at ? true : latest;
								},
								false,
							)
						: !!submission?.submitted_at,
				late: !!submission?.late,
				missing:
					submission?.missing ??
					(type === AssignmentType.QUIZ
						? submission.quiz_submissions.reduce(
								(latest, current) =>
									latest ||
									current?.workflow_state === "untaken",
								false,
							)
						: false) ??
					false,
				due_at:
					submission?.cached_due_date ??
					submission?.due_at ??
					(type === AssignmentType.QUIZ &&
					submission.quiz_submissions.length > 0
						? submission.quiz_submissions[0]?.end_at
						: null),
			};

			return converted;
		});
	} catch (error) {
		console.log("Error converting submission:", error);
	}
}
