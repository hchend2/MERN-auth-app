
// File: user-auth-frontend/src/components/login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const API_URL = 'http://localhost:5000/api/login'; // Define the API URL for login

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to hold error messages
  const navigate = useNavigate(); // Hook to programmatically navigate
  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL , { // API endpoint for login
        email,
        password,
      }); // Send login request to the backend
      localStorage.setItem('token', response.data.token); // Store the token in local storage if login is successful
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (err) {
      setError('Invalid email or password'); // Set error message for invalid login
    }
  };
  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email}  onChange={(e) => setEmail(e.target.value)} required/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <button type="submit">Login</button>
      </form>
        <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
};
export default Login;