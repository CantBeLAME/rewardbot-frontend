import React, { useEffect, useState } from "react";
import ToDoCard from "./ToDoCard";

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
		<div className="w-96 rounded-2xl bg-white p-8 shadow-lg">
			<h1 className="mb-6 text-center text-2xl font-bold text-pink-500">
				My To-Do List
			</h1>
			{todos.map((item, index) => (
				<ToDoCard key={index} item={item} index={index} />
			))}
		</div>
	);
}
