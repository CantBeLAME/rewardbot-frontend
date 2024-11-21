import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "react-query";
import reportWebVitals from "./reportWebVitals";
import "./style/popup.css";

// Create a QueryClient instance
const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<Router />
			</QueryClientProvider>
		</React.StrictMode>,
	);
}

reportWebVitals();
