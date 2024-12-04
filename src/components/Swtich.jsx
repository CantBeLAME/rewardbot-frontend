import React, { useState } from "react";

export default function Switch() {
	const [toggle, setToggle] = useState(false); // Toggle state

	return (
		<>
			<div className="mt-6 flex items-center">
				<div
					className={`relative inline-block h-6 w-12 rounded-full transition duration-200 ease-in ${toggle ? "bg-blue-500" : "bg-gray-300"}`}
					onClick={() => setToggle(!toggle)}
				>
					<div
						className={`absolute left-0.5 top-0.5 h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${toggle ? "translate-x-6" : "translate-x-0"}`}
					/>
				</div>
			</div>
		</>
	);
}
