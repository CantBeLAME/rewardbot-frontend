import { Fieldset, Form, Input, Label } from "../../components/Form";
import { Button } from "../../components/Button";
import { usePostUser } from "../../hooks/query/user";
import { apiGetUserByEmail } from "../../api/user";
import { Link, useNavigate } from "react-router-dom";
import Popup from "react-popup";
import { useState } from "react";

export default function CreateAccount() {
	const { postUser } = usePostUser();
	const [error, setError] = useState(0);

	const navigate = useNavigate();
	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		const email = form.get("email");
		const password = form.get("password");
		const confirm = form.get("confirmation-password");
		const canvasToken = form.get("canvasToken");

		const data = await apiGetUserByEmail({ email });

		if (data) {
			//"Email already exists"
			setError(1);
			return;
		}

		if (password !== confirm) {
			// "Password do not match"
			setError(2);
			return;
		}

		postUser(
			{ email, password, canvasToken },
			{
				onSuccess: () => {
					Popup.alert("User created successfully");
					navigate("/");
				},
				onError: () => alert("User creation failed"),
			},
		);
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<div className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-md">
				<h2 className="text-center text-2xl font-bold text-gray-700">
					Register
				</h2>
				<Form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
					<Fieldset>
						<Label className="pt-3">
							Email
							<Input
								required
								type="email"
								name="email"
								placeholder="Enter your email"
							/>
							{error === 1 && <Label className="text-red-500 text-xs pl-2 mt-1">* Email already exists</Label>}
						</Label>

						<Label>
							Password
							<Input
								required
								type="password"
								name="password"
								placeholder="Enter your password"
							/>
						</Label>
						<Label>
							Confirm Password
							<Input
								required
								type="password"
								name="confirmation-password"
								placeholder="Confirm your password"
							/>
							{error === 2 && <Label className="text-red-500 text-xs pl-2 mt-1">* Password do not match</Label>}
						</Label>
						<Label>
							Canvas Access Token
							<Input
								required
								type="text"
								name="canvasToken"
								placeholder="Enter your canvas access token"
							/>
						</Label>
						<Label>
							Need help?
							<Link
								className="font-bold underline"
								to="https://community.canvaslms.com/t5/Canvas-Basics-Guide/How-do-I-manage-API-access-tokens-in-my-user-account/ta-p/615312#:~:text=Mobile%20access%20tokens%20are%20generated,access%20token%20must%20be%20deleted."
								target="_blank"
								rel="noopener noreferrer"
							>
								{" "}
								How to get a Canvas Access Token
							</Link>
						</Label>
						<Button type="submit">Register</Button>
					</Fieldset>
				</Form>
			</div>
		</div>
	);
}
