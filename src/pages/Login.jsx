import React from "react";
import { Link } from "react-router-dom"
import { Fieldset, Form, Input, Label } from "../components/Form";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";


export default function Login() {
  	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const email = formData.get("email");
		const password = formData.get("password");

		const groupInformation = JSON.parse(localStorage.getItem("groupInformation"));

		console.log(email, password);

		const user = groupInformation.find((user) => user.email === email);
		if (user && user.password === password) {
			alert("Login successful");
			localStorage.setItem("email", email);
			//navigate to welcomepage
			navigate("/welcome");
		}
		else {
			alert("Login failed");
		}
	};

	return (
		<>
			<div className="flex min-h-screen items-center justify-center bg-gray-100">
				<div className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-md">
					<h2 className="text-center text-2xl font-bold text-gray-700">
						Login
					</h2>
					<Form onSubmit={handleSubmit}>
						<Fieldset>
							<Label>
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
							<Button className="mt-4 h-10" type="submit">
								Login
							</Button>
							<Link className="flex w-full" to="/create-account">
								<Button className="mt-4 h-10 w-full" type="submit">
									Create Account
								</Button>
							</Link>
						</Fieldset>
					</Form>
				</div>
			</div>
		</>
	);
}
