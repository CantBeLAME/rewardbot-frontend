import React from "react";
import { Link } from "react-router-dom"
import { Fieldset, Form, Input, Label } from "../components/Form";
import { Button } from "../components/Button";
import { apiLogin } from '../api/user';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export default function Login() {
	const navigate = useNavigate();
	const { setUserInfo } = useAuthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const email = formData.get("email");
		const password = formData.get("password");

		const {status, data} = await apiLogin({ email, password })

		if (status !== 200) {
			alert("Login failed");
			return;
		}
		setUserInfo(data.user);
		
		alert("Login successful");
		navigate("/statistics");
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
