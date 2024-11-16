import { Fieldset, Form, Input, Label } from "../components/Form";
import { Button } from "../components/Button";
import { usePostUser } from "../database/query/user";
import { apiGetUserByEmail } from '../database/api/user';
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
	const { postUser } = usePostUser();
	// const { getUserByEmail  } = useGetUserByEmail();

	const navigate = useNavigate();
	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
        const username = form.get("username");
        const email = form.get("email");
        const password = form.get("password");


		const data = await apiGetUserByEmail({ email });
		if (data) {
			alert("Email already exists");
			return;
		}


		await postUser({ username, email, password }, 
			{ onSuccess: () => {
					alert("User created successfully") 
					navigate("/login");
			}},
			{ onError: () => alert("User creation failed") }
		);

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
						<Button type="submit">Register</Button>
					</Fieldset>
				</Form>
			</div>
		</div>
	);
}
