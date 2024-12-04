// enums as objects in JavaScript
export const AssignmentType = {
	ASSIGNMENT: "assignment",
	QUIZ: "quiz",
	DISCUSSION: "discussion_topic",
	NOTE: "planner_note",
	ANNOUNCEMENT: "announcement",
	EVENT: "calendar_event",
	GRADESCOPE: "gradescope",
};

export const AssignmentStatus = {
	COMPLETE: "complete",
	MISSING: "missing",
	LATE: "late",
	NOSUBMISSION: "nosubmission",
};

export const PlannerAssignmentDefaults = {
	id: "0",
	course_id: "0",
	plannable_id: "0", // required
	plannable_type: AssignmentType.ASSIGNMENT,
	planner_override: null, // remember to check properties if not null
	plannable_date: undefined,
	submissions: false, // remember to check properties if not false
	plannable: {
		assignment_id: undefined, // use this for graphql requests
		id: "0",
		title: "Untitled Assignment",
		details: "",
		due_at: "", // this or todo_date required
		todo_date: "", // for custom planner notes
		points_possible: 0,
		course_id: "0", // for custom planner notes
		linked_object_html_url: "", // for custom planner notes
		read_state: "", // for announcements
	},
	html_url: "",
};

export const AssignmentDefaults = {
	// color: string; // color assigned to course
	html_url: "", // link to assignment page
	name: "", // title of assignment
	points_possible: 0,
	due_at: "",
	course_id: "", // course the assignment belongs to
	id: "", // id of the assignment
	plannable_id: "", // id of planner item for marking complete
	override_id: "", // id of existing planner override
	submitted: false, // has the user submitted it?
	graded: false, // has the teacher graded it?
	graded_at: "", // date the teacher graded (if graded)
	score: 0, // grade assigned, 0 if ungraded or unsubmitted
	grade: "", // grade displayed (letter scale or point scale)
	type: AssignmentType.ASSIGNMENT,
	// course_name: '', // via useCourseName
	marked_complete: AssignmentStatus.UNFINISHED, // marked complete in the sidebar or through the planner
	// position: 0,
	needs_grading_count: 0,
	total_submissions: 0,
};
