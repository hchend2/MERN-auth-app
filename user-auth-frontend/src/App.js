//
// File: user-auth-frontend/src/App.js
//
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
// import './App.css';

// This is the main App component that sets up the routes for the application
const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={ localStorage.getItem('token') ? 
            <Dashboard /> : <Navigate to="/login" replace/>}/> 
          <Route path="/" element={<Login />} /> {/* Default route */} 
        </Routes>
      </div>
    </Router>
  );
}
export default App;
