import React, { useEffect, useState } from "react";
import ToDoCard from "./ToDoCard";
import Container from "../../Container";

export default function ToDoList({ showCompleted, data }) {
	const [todos, setTodos] = useState(data);

	useEffect(() => {
		setTodos(
			showCompleted ? data : data.filter((item) => !item.marked_complete),
		);
	}, [showCompleted, data]);

	return (
		<div className="min-w-64 lg:min-w-96">
			<Container className={"p-6"}>
				<h1 className="mb-6 text-center text-2xl font-bold">
					My To-Do List
				</h1>
				{todos.map((item, index) => (
					<ToDoCard key={index} item={item} index={index} />
				))}
			</Container>
		</div>
	);
}
