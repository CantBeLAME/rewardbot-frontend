import React from "react";

export default function Welcome() {

	const email = localStorage.getItem("email");
	const groupInformation = JSON.parse(localStorage.getItem("groupInformation"));

	const user = groupInformation.find((user) => user.email === email);
	return (
		<>
			<div className="flex min-h-screen items-center justify-center bg-gray-100">
				<div className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-md">
					<h2 className="text-center text-2xl font-bold text-gray-700">
						Hi {user.username}!
					</h2>
					<p className="flex w-full text-center">Download RewardBot with the Link Below!</p>
					
				</div>
			</div>
		</>
	);
}
