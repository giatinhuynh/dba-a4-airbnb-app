import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Create the root element where the React app will be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main App component inside the root element with React.StrictMode for highlighting potential problems
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
