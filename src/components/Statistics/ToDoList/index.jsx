import React, { useEffect, useState } from "react";
import ToDoCard from "./ToDoCard";
import Container from "../../Container";

export default function ToDoList({ data }) {
	const [todos, setTodos] = useState(data);

	// const markComplete = (index) => {
	// 	const updatedTodos = [...todos];
	// 	updatedTodos[index].marked_complete = true;
	// 	setTodos(updatedTodos);
	// };

	useEffect(() => {
		setTodos(data);
	}, [data]);

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
