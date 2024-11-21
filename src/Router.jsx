import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateAccount, Login, Statistics, Welcome, Profile } from './pages';
import Nav from './components/Nav';
import PopUp from './components/PopUp';

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/create-account" element={<CreateAccount />} />
				<Route path="/uninstall" element={<About />} />

				<Route
					path="/welcome"
					element={
						<Nav>
							<Welcome />
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

// apiReq
function About() {
	return <h2>About</h2>;
}
function Home() {
	return <h2>Home</h2>;
}
