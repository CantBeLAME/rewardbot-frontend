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
				assignment.planner_override?.dismissed ||
				(assignment.plannable_type === AssignmentType.ANNOUNCEMENT &&
					assignment.plannable.read_state === "read"),
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
