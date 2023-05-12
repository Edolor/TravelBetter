import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import "./Assets/css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App /> 
      </Router>
    </AuthProvider>
  </React.StrictMode>
);