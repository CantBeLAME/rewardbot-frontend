import React from "react";
import { useCanvasAuth } from "../../hooks/auth/useAuth";
import Container from "../../components/Container";

export default function Home() {
	const {
		canvasUser: { firstname, lastname },
		loadingCanvas,
	} = useCanvasAuth();

	if (loadingCanvas) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex w-full h-full items-center justify-center">
			<Container className={"max-w-[40%] max-h-[40%] p-4"}>
					<h2 className="text-center text-2xl font-bold text-gray-700">
						Hi {firstname} {lastname}!
					</h2>
					<p className="flex w-full text-center">
						Download RewardBot with the Link Below!
					</p>
			</Container>
		</div>
	);
}
