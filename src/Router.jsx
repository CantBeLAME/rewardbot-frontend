import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Login, CreateAccount, Welcome } from "./pages";

export default function Router() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/uninstall" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

function About() {
  return <h2>About</h2>;
}