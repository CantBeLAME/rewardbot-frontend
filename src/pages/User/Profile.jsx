import React from "react";
import Profile from "../../components/Profile/Profile";
import Settings from "../../components/Profile/Settings";
import { Main, Sidebar } from "../../components/Sidebar";

export default function ProfilePage() {

	return (
		<div className="flex h-full w-full">
			<Sidebar>
				<Profile />
			</Sidebar>
			<Main>
				<Settings />
				<Settings />
			</Main>
		</div>
	);
};
