import React from "react";

export default function Radio({ options, selectedOption, setSelectedOption}) {
    return (
        <>
            <div className="flex space-x-4 w-full">
                {options.map((option) => (
                    <label
                        key={option.value}
                        className={`flex w-full items-center justify-center px-4 py-2 cursor-pointer rounded-lg transition border ${selectedOption === option.value ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
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

