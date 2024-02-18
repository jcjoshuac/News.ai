import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import global styles here
import App from './App'; // Import the main App component

// Assuming you have an element with the ID 'root' in your index.html
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
