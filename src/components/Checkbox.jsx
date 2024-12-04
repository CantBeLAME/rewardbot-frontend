import React from "react";

export default function Checkbox({ children, isChecked, setIsChecked }) {

    return (
        <>
            <div className="mt-6 flex items-center">
                <label
                    className={`flex items-center py-2 cursor-pointer rounded-lg transition ${isChecked ? "" : "text-gray-800"}`}
                    onClick={() => setIsChecked(!isChecked)}
                >
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                        className="w-6 h-6 rounded-lg"
                    />
                <span className="ml-2">{children}</span>
                </label>
            </div>
        </>
    );
}
