import React from "react";

export default function Checkbox({ children, isChecked, setIsChecked }) {
	return (
		<>
			<div className="mt-6 flex items-center">
				<label
					className={`flex cursor-pointer items-center rounded-lg py-2 transition ${isChecked ? "" : "text-gray-800"}`}
					onClick={() => setIsChecked(!isChecked)}
				>
					<input
						type="checkbox"
						checked={isChecked}
						onChange={() => setIsChecked(!isChecked)}
						className="h-6 w-6 rounded-lg"
					/>
					<span className="ml-2">{children}</span>
				</label>
			</div>
		</>
	);
}
