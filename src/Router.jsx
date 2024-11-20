import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { CreateAccount, Login, Statistics, Welcome } from "./pages";


export default function Router() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/uninstall" element={<About />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
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