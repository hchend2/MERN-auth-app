//
// File: user-auth-frontend/src/components/register.js
//
import React, { useState } from 'react';
import axios from 'axios';
import './register.css';


const API_URL = process.env.REACT_APP_API_URL; // Base URL for API requests ...

// This component handles user registration ...
const Register = () => {
  
  // const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault(); // prevent the default form submition ...

    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/register`, // API endpoint for registration ...
        {
        firstname,
        lastname,
        email,
        password
        }, {
          withCredentials: true
      }
    );
      console.log("Registration successfull!", response.data);
      alert("Registration Successfull!");

      // clear the form after success ...
      setFirstname('');
      setLastname('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Navigate to login or another page after success
      // navigate('/login');

    } catch (error) {
      alert("Registration failed");
      console.error('Registration failed:', error);
    }
  };

  // Handle input changes ...
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    switch(name) {
      case 'firstname':
        setFirstname(value);
        break;
      case 'lastname':
        setLastname(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" name="firstname" placeholder="Firstname" value={firstname} onChange={handleChange} required />
        <input type="text" name="lastname" placeholder="Lastname" value={lastname} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} required autoComplete='new-email'/>
        <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} required autoComplete='new-password'/>
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={handleChange} required autoComplete='new-password'/>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Register;