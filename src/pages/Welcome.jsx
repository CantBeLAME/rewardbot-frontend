import React from "react";
import { useAuth } from "../hooks/auth/useAuth";

export default function Welcome() {
	const {
		user: { username },
		loading,
	} = useAuth();

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div className="flex min-h-screen items-center justify-center bg-gray-100">
				<div className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-md">
					<h2 className="text-center text-2xl font-bold text-gray-700">
						Hi {username}!
					</h2>
					<p className="flex w-full text-center">
						Download RewardBot with the Link Below!
					</p>
				</div>
			</div>
		</>
	);
}
