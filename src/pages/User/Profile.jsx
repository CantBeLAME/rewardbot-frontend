import React from "react";
import Profile from "../../components/Profile";
import Settings from "../../components/Settings";

export default function ProfilePage() {

	return (
		<div className="flex min-h-screen">
			<Profile />
			<div className="flex-grow">
				<Settings />
			</div>
		</div>
	);
};
