// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to hold error messages
  const navigate = useNavigate(); // Hook to programmatically navigate
  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { // API endpoint for login
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
      {error && <p className="error">{error}</p>} // Display error message if there is one
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