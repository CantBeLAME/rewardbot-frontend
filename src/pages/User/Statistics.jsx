import React, { useEffect, useState } from "react";
import { getAssignmentsTimeRange, validateToken } from "../../api/canvas";
import { useAuth } from "../../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { DataHandle, ToDoList } from "../../components/Statistics/";
import { AssignmentType } from "../../const/assignments";
import { Main, Sidebar } from "../../components/Sidebar";

export default function Statistics() {
	const {
		user: { showCompleted, option },
		loading,
	} = useAuth();
	const navigate = useNavigate();
	const [planner, setPlanner] = useState([]);

	useEffect(() => {
		if (loading) return;
		validateToken(
			() => getAssignmentsTimeRange(option),
			(data) => {
				setPlanner(
					data?.filter(
						({ type }) =>
							type === AssignmentType.ASSIGNMENT ||
							type === AssignmentType.QUIZ ||
							type === AssignmentType.DISCUSSION,
					) ?? [],
				);
			},
			() => {
				navigate("/");
			},
		);
	}, [option, navigate, loading]);

	const sortedData = [...planner].sort(
		(a, b) => new Date(a.due_at) - new Date(b.due_at),
	);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex h-full w-full flex-row">
			<Sidebar>
				<ToDoList showCompleted={showCompleted} data={sortedData} />
			</Sidebar>
			<Main>
				<DataHandle data={planner} />
			</Main>
		</div>
	);
}
