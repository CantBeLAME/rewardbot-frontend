import React from "react";
import Profile from "../../components/Profile/Profile";
import Settings from "../../components/Profile/Settings";
import { Main, Sidebar } from "../../components/Sidebar"; 
import { useAuth, useCanvasAuth } from "../../hooks/auth/useAuth";

export default function ProfilePage() {
	const {
		user,
		loading,
	} = useAuth();
	const {
		canvasUser,
		loadingCanvas,
	} = useCanvasAuth();

	if (loading || loadingCanvas) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex h-full w-full">
			<Sidebar>
				<Profile user={user} canvasUser={canvasUser}/>
			</Sidebar>
			<Main>
				<Settings user={user}/>
				<Settings user={user} />
			</Main>
		</div>
	);
};
