import React from "react";

export default function Radio({ options, selectedOption, setSelectedOption }) {
	return (
		<>
			<div className="flex w-full space-x-4">
				{options.map((option) => (
					<label
						key={option.value}
						className={`flex w-full cursor-pointer items-center justify-center rounded-lg border px-4 py-2 transition ${selectedOption === option.value ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
						onClick={() => setSelectedOption(option.value)}
					>
						<input
							type="radio"
							name="radioOptions"
							value={option.value}
							checked={selectedOption === option.value}
							onChange={() => setSelectedOption(option.value)}
							className="hidden"
						/>
						<span>{option.label}</span>
					</label>
				))}
			</div>
		</>
	);
}
