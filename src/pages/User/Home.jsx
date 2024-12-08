import React from "react";
import { useCanvasAuth } from "../../hooks/auth/useAuth";
import Container from "../../components/Container";
import Robot from "../../assets/images/robot.png";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import Extension from "../../assets/files/build.zip";

export default function Home() {
	const {
		canvasUser: { firstname, lastname },
		loadingCanvas,
	} = useCanvasAuth();

	if (loadingCanvas) {
		return <div>Loading...</div>;
	}

	const downloadExtension = () => {
		window.location.href = Extension;
	}

	return (
		<div className="flex h-full w-full items-center justify-center">
			<Container
				className={
					"flex max-h-[40%] max-w-[40%] flex-col items-center justify-center gap-10 p-4"
				}
			>
				<h2 className="text-center text-2xl font-bold text-gray-700">
					Hi {firstname} {lastname}!
				</h2>
				<img src={Robot} alt="robot" className="h-32" />
				{/* <Link to={Extension}> */}
				<Button className="flex h-10 w-64 w-full text-center" onClick={downloadExtension}>
						Download RewardBot Chrome Extension!
					</Button>
				{/* </Link> */}
			</Container>
		</div>
	);
}
