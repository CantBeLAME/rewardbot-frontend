import React from "react";

export default function Checkbox({ children, isChecked, handleCheck }) {
	return (
		<>
			<div className="mt-6 flex items-center">
				<label
					className={`flex cursor-pointer items-center rounded-lg py-2 transition ${isChecked ? "" : "text-gray-800"}`}
				>
					<input
						type="checkbox"
						checked={isChecked}
						onChange={() => handleCheck(!isChecked)}
						className="h-6 w-6 rounded-lg"
					/>
					<span className="ml-2">{children}</span>
				</label>
			</div>
		</>
	);
}
