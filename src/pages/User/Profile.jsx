import React from "react";
import { useAuth, useCanvasAuth } from "../../hooks/auth/useAuth";

const ProfilePage = () => {
	const {
		user: { email, createdAt },
		loading,
	} = useAuth();
	const {
		canvasUser: { image, firstname, lastname },
		loadingCanvas,
	} = useCanvasAuth();

	if (loading || loadingCanvas) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
				<div className="flex flex-col items-center">
					<img
						className="h-24 w-24 rounded-full border-4 border-blue-500"
						src={image ?? "https://via.placeholder.com/150"}
						alt="User Avatar"
					/>
					<h2 className="mt-4 text-2xl font-bold text-gray-800">
						{firstname} {lastname}
					</h2>
				</div>
				<div className="mt-6 space-y-4">
					<div className="flex items-center justify-between">
						<span className="text-gray-600">Email:</span>
						<span className="font-medium text-gray-800">
							{email}
						</span>
					</div>
					<div className="flex items-center justify-between">
						<span className="text-gray-600">Joined:</span>
						<span className="font-medium text-gray-800">
							{createdAt}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
