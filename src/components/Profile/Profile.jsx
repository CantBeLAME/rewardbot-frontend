import { Content, Title } from "../Sidebar";
import Container from "../Container";

export default function Profile({
	user: { email, createdAt },
	canvasUser: { image, firstname, lastname },
}) {
	const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<Container className={"flex items-center justify-center p-8"}>
			<Content>
				<img
					className="border-black-100 h-24 w-24 rounded-full border-4"
					src={image ?? "https://via.placeholder.com/150"}
					alt="User Avatar"
				/>
				<Title>
					{firstname} {lastname}
				</Title>

				<div className="mt-6 w-full space-y-4">
					<div className="flex items-center justify-between gap-x-8">
						<span className="text-gray-600">Email:</span>
						<span className="font-medium text-gray-800">
							{email}
						</span>
					</div>
					<div className="flex w-full items-center justify-between gap-x-8">
						<span className="text-gray-600">Joined:</span>
						<span className="font-medium text-gray-800">
							{formattedDate}
						</span>
					</div>
				</div>
			</Content>
		</Container>
	);
}
