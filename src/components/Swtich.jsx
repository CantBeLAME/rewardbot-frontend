import React, { useState } from "react";

export default function Switch() {
    const [toggle, setToggle] = useState(false); // Toggle state

    return (
        <>
            <div className="mt-6 flex items-center">
                <div
                    className={`relative inline-block w-12 h-6 transition duration-200 ease-in rounded-full ${toggle ? "bg-blue-500" : "bg-gray-300"}`}
                    onClick={() => setToggle(!toggle)}
                >
                    <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${toggle ? "translate-x-6" : "translate-x-0"}`}
                    />
                </div>
            </div>
        </>
    );
}
