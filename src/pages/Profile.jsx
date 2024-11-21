import React from "react";
import { useAuth } from "../hooks/auth/useAuth";
// import { useAuthStore } from "../store/auth";

const ProfilePage = () => {
	const {
		user: { username, email, createdAt },
	} = useAuth();

	// const { setUserInfo } = useAuthStore();

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
				<div className="flex flex-col items-center">
					<img
						className="h-24 w-24 rounded-full border-4 border-blue-500"
						src="https://via.placeholder.com/150"
						alt="User Avatar"
					/>
					<h2 className="mt-4 text-2xl font-bold text-gray-800">
						{username}
					</h2>
					<p className="mt-2 text-center text-gray-600">
						Full-stack developer passionate about building amazing
						user experiences.
					</p>
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
				<button className="mt-6 w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
					Edit Profile
				</button>
			</div>
		</div>
	);
};

export default ProfilePage;
