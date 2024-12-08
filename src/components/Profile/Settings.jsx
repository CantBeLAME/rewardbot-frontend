import React, { useState } from "react";
import Container from "../Container";
import { IoMdSettings } from "react-icons/io";
import Checkbox from "../Checkbox";
import Radio from "../Radio";
import { apiOption, apiShowCompleted } from "../../api/user";

export default function Settings({ user: { id, option, showCompleted } }) {
	const [statisticOption, setStatisticOption] = useState(option);
	const [isChecked, setIsChecked] = useState(showCompleted);

	const dateRangeSetting = [
		{ value: "Day", label: "Day" },
		{ value: "Week", label: "Week" },
		{ value: "Month", label: "Month" },
		{ value: "Semester", label: "Semester" },
	];

	const handleOption = (e) => {
		const newOption = e.target.value;
		if (newOption === undefined || newOption === statisticOption) return;

		apiOption({ id, option: newOption });
		setStatisticOption(newOption);
	};

	const handleShowComplete = (check) => {
		if (check === isChecked) return;

		apiShowCompleted({ id, showCompleted: check });
		setIsChecked(check);
	};

	return (
		<Container className={"flex flex-col gap-8 p-8"}>
			<h2 className="flex items-center gap-4 text-center text-2xl font-bold text-gray-800">
				<IoMdSettings />
				Settings
			</h2>
			<div className="flex flex-col justify-center gap-5 pl-8">
				<Radio
					options={dateRangeSetting}
					selectedOption={statisticOption}
					handleOption={handleOption}
				/>
				<Checkbox isChecked={isChecked} handleCheck={handleShowComplete}>
					<span>Show Completed Assignments in To Do List</span>
				</Checkbox>
			</div>
		</Container>
	);
}
