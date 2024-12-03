import React, { useState } from "react";

export default function Radio() {
    const [selectedOption, setSelectedOption] = useState("option1"); // Default selected

    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    return (
        <div className="radio-ui-container p-4 max-w-md mx-auto border rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Choose an Option</h2>
            <div className="space-y-4">
                {options.map((option) => (
                    <label
                        key={option.value}
                        className={`flex items-center space-x-3 cursor-pointer p-2 rounded transition ${selectedOption === option.value ? "bg-blue-100" : "hover:bg-gray-100"
                            }`}
                    >
                        <input
                            type="radio"
                            name="radioOptions"
                            value={option.value}
                            checked={selectedOption === option.value}
                            onChange={() => setSelectedOption(option.value)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-gray-800">{option.label}</span>
                    </label>
                ))}
            </div>
            <button
                className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                onClick={() => alert(`You selected: ${selectedOption}`)}
            >
                Submit
            </button>
        </div>
    );
}
