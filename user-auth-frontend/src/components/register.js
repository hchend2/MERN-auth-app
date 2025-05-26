
// File: user-auth-frontend/src/components/register.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';

// This component handles user registration
const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(''); // State to hold error messages
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update form data state
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    } // Check if passwords match
    setError(''); // Clear any previous error messages
    
    try { // Send registration request to the backend
      await axios.post('/api/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } // Handle errors during registration
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="firtname" placeholder="Firstname"   value={formData.firstname} onChange={handleChange} required/>
        <input type="text" name="lastname" placeholder="Lastname"     value={formData.lastname} onChange={handleChange} required/>
        <input type="email" name="email" placeholder="Email"             value={formData.email} onChange={handleChange} required/>
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
        <input type="password" name="confirmPassword" placeholder="Confirm Password" 
                                                               value={formData.confirmPassword} onChange={handleChange} required/>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}
export default Register;