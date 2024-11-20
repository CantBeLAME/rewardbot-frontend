import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './Router'; 
import { QueryClient, QueryClientProvider } from 'react-query';
import reportWebVitals from './reportWebVitals';

// Create a QueryClient instance
const queryClient = new QueryClient();

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

reportWebVitals();

// // Log performance if needed
// reportWebVitals();
