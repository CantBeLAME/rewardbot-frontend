import React from "react";

export default function Radio({
	options,
	selectedOption,
	handleOption,
}) {
	return (
		<>
			<div className="flex w-full space-x-4">
				{options.map((option) => (
					<label
						key={option.value}
						className={`flex w-full cursor-pointer items-center justify-center rounded-lg border px-4 py-2 transition ${selectedOption === option.value ? "bg-primary text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
						onClick={handleOption}
					>
						<input
							type="radio"
							name="radioOptions"
							value={option.value}
							checked={selectedOption === option.value}
							onChange={handleOption}
							className="hidden"
						/>
						<span>{option.label}</span>
					</label>
				))}
			</div>
		</>
	);
}
