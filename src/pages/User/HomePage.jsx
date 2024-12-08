import React from "react";
import { useCanvasAuth } from "../../hooks/auth/useAuth";
import Container from "../../components/Container";
import Robot from "../../assets/images/robot.png";
import { Button } from "../../components/Button";
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
	};

	return (
		<div className="flex h-full w-full items-center justify-center">
			<Container
				className={
					"inline-flex max-h-[50vh] max-w-[40%] flex-col items-center justify-center gap-6 px-16"
				}
			>
				<h2 className="text-center text-2xl font-bold text-gray-700">
					Hi {firstname} {lastname}!
				</h2>
				<img src={Robot} alt="robot" className="h-32" />
				<div className="flex w-full flex-col gap-4">
					<a
						href={"https://www.tasksforcanvas.info/"}
						className="w-full"
					>
						<Button
							variant={"secondary"}
							className="flex h-10 w-full text-center"
						>
							Download Task for Canvas Chrome Extension!
						</Button>
					</a>
					<Button
						className="flex h-10 w-full text-center"
						onClick={downloadExtension}
					>
						Download RewardBot Chrome Extension!
					</Button>
					<label className="text-xs text-red-700">
						* Make the most of RewardBot! For a complete experience,
						please download the Task for Canvas Chrome Extension. It
						offers additional features designed to complement
						RewardBot perfectly.
					</label>
				</div>
			</Container>
		</div>
	);
}