import { Fieldset, Form, Input, Label } from "../components/Form";
import { Button } from "../components/Button";
import { usePostUser } from "../hooks/query/user";
import { apiGetUserByEmail } from '../api/user';
import { Link, useNavigate } from "react-router-dom";

export default function CreateAccount() {
	const { postUser } = usePostUser();

	const navigate = useNavigate();
	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		const username = form.get("username") ;
		const email = form.get("email");
		const password = form.get("password");
		const canvasToken = form.get("canvasToken");


		const data = await apiGetUserByEmail({ email });
		if (data) {
			alert("Email already exists");
			return;
		}


		postUser({ username, email, password, canvasToken }, {
			onSuccess: () => {
				alert("User created successfully");
				navigate("/login");
			},
			onError: () => alert("User creation failed")
		});

	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<div className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-md">
				<h2 className="text-center text-2xl font-bold text-gray-700">
					Register
				</h2>
				<Form className="space-y-6" onSubmit={handleSubmit}>
					<Fieldset>
						<Label className="pt-3">
							Username
							<Input
								type="text"
								name="username"
								placeholder="Enter your username"
							/>
						</Label>
						<Label className="pt-3">
							Email
							<Input
								type="email"
								name="email"
								placeholder="Enter your email"
							/>
						</Label>

						<Label>
							Password
							<Input
								type="password"
								name="password"
								placeholder="Enter your password"
							/>
						</Label>
						<Label>
							Confirm Password
							<Input
								type="password"
								name="confirmation-password"
								placeholder="Confirm your password"
							/>
						</Label>
						<Label>
							Canvas Access Token
							<Input
								type="password"
								name="canvasToken"
								placeholder="Enter your canvas access token"
							/>
						</Label>
						<Label>
							Need help?
							<Link className="font-bold underline" to="https://community.canvaslms.com/t5/Canvas-Basics-Guide/How-do-I-manage-API-access-tokens-in-my-user-account/ta-p/615312#:~:text=Mobile%20access%20tokens%20are%20generated,access%20token%20must%20be%20deleted." target="_blank" rel="noopener noreferrer">
								{' '}How to get a Canvas Access Token
							</Link>
						</Label>
						<Button type="submit">Register</Button>
					</Fieldset>
				</Form>
			</div>
		</div>
	);
}
