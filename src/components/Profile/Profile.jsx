import { Content, Title } from "../Sidebar";
import Container from "../Container";

export default function Profile({
	user: { email, createdAt },
	canvasUser: { image, firstname, lastname },
}) {
	return (
		<Container className={"flex justify-center items-center p-8"}>
			<Content>
				<img
					className="h-24 w-24 rounded-full border-4 border-blue-500"
					src={image ?? "https://via.placeholder.com/150"}
					alt="User Avatar"
				/>
				<Title>
					{firstname} {lastname}
				</Title>

				<div className="mt-6 space-y-4">
					<div className="flex items-center justify-between gap-x-5">
						<span className="text-gray-600">Email:</span>
						<span className="font-medium text-gray-800">
							{email}
						</span>
					</div>
					<div className="flex items-center justify-between">
						<span className="text-gray-600">Joined:</span>
						<span className="font-mediumtext-gray-800">
							{createdAt}
						</span>
					</div>
				</div>
			</Content>
		</Container>
	);
}
