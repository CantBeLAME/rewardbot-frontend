import React from "react";
import { Profile, Settings, Reward } from "../../components/Profile";
import { Main, Sidebar } from "../../components/Sidebar";
import { useAuth, useCanvasAuth } from "../../hooks/auth/useAuth";

export default function ProfilePage() {
	const { user, loading } = useAuth();
	const { canvasUser, loadingCanvas } = useCanvasAuth();

	if (loading || loadingCanvas) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex h-full w-full flex-col gap-6">
			<div className="flex h-[45%] w-full">
				<Sidebar>
					<Profile user={user} canvasUser={canvasUser} />
				</Sidebar>
				<Main>
					<Settings user={user} />
				</Main>
			</div>
			<Reward user={user} />
		</div>
	);
}
