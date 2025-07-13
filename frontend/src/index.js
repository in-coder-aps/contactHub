import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Minimal styling if you want to add some later

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);