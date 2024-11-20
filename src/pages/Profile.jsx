import React from "react";
import { useAuth } from "../hooks/auth/useAuth";
// import { useAuthStore } from "../store/auth";


const ProfilePage = () => {
    const { user: { username, email, canvasToken, createdAt } } = useAuth();
    // const { user: { username }, loading } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-sm w-full">
                <div className="flex flex-col items-center">
                    <img
                        className="w-24 h-24 rounded-full border-4 border-blue-500"
                        src="https://via.placeholder.com/150"
                        alt="User Avatar"
                    />
                    <h2 className="mt-4 text-2xl font-bold text-gray-800">{username}</h2>
                    <p className="text-gray-600 text-center mt-2">
                        Full-stack developer passionate about building amazing user experiences.
                    </p>
                </div>
                <div className="mt-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Email:</span>
                        <span className="text-gray-800 font-medium">{email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Joined:</span>
                        <span className="text-gray-800 font-medium">{createdAt}</span>
                    </div>
                </div>
                <button className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
