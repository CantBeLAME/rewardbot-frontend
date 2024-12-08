import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
	CreateAccount,
	Login,
	Statistics,
	Home,
	Profile,
	Goodbye,
} from "./pages";
import Nav from "./components/Nav";
import PopUp from "./components/PopUp";

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/create-account" element={<CreateAccount />} />
				<Route path="/uninstall" element={<Goodbye />} />
				<Route
					path="/home"
					element={
						<Nav>
							<Home />
						</Nav>
					}
				/>
				<Route
					path="/statistics"
					element={
						<Nav>
							<Statistics />
						</Nav>
					}
				/>
				<Route
					path="/profile"
					element={
						<Nav>
							<Profile />
						</Nav>
					}
				/>
			</Routes>
			<PopUp />
		</BrowserRouter>
	);
}
