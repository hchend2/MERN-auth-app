
// // File: user-auth-frontend/src/components/register.js

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './register.css';
// import { useAuthStore } from '../store/useAuthStore';
// import {toast} from 'react-hot-toast'; // Import toast for notifications 





// // This component handles user registration
// const Register = () => {
//   const [formData, setFormData] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });


//   // State to hold form data
//   const {register} = useAuthStore(); // Import the register action from the auth store

//   const handleRegister = async (e) => {
//     e.preventDefault(); // Prevent default form submission
//     try {
//       await register(formData.firstname, formData.lastname, formData.email, formData.password); // Call the register action from the store
//       if (formData.password !== formData.confirmPassword) {
//         toast.error('Passwords do not match'); // Show error if passwords do not match
//         return;
//       } // Check if passwords match
//       toast.success('Registration successful!'); // Show success message
//       await register(formData.firstname, formData.lastname, formData.email, formData.password); // Call the register action from the store
//       // After successful registration, redirect to login page
//       // navigate('/login');
//     } catch (error) {
//       console.error('Registration failed:', error);
//     }
//   };
//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value }); // Update form data state
//   };
//   return (
//     <div className="register-container">
//       <h2>Register</h2>
//       {/* {error && <p className="error">{error}</p>} */}
//       <form onSubmit={handleRegister}>
//         <input type="text" name="firstname" placeholder="Firstname" value={formData.firstname} onChange={handleChange} required />
//         <input type="text" name="lastname" placeholder="Lastname" value={formData.lastname} onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
//         <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
//         <button type="submit">Register</button>
//       </form>
//       <p>Already have an account? <a href="/login">Login</a></p>
//     </div>
//   );
// }
// export default Register;




// File: user-auth-frontend/src/components/register.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';
import { toast } from 'react-hot-toast';


// This component handles user registration
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // This function handles the registration process
  // It sends a POST request to the backend with the user's details
  // If successful, it navigates to the login page
  // If there's an error, it displays a toast notification
  // It uses axios for HTTP requests and react-hot-toast for notifications
  // Handle user registration
  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password
      }, {
        withCredentials: true, // Important if backend uses cookies
        headers: {
          'Content-Type': 'application/json'
        }
      });

      toast.success('Registration successful!');
      console.log(response.data);

      // Navigate to login or another page after success
      navigate('/login');

    } catch (error) {
      console.error('Registration failed:', error);
      toast.error(error.response?.data || 'Something went wrong during registration');
    }
  };

  // Handle input changes
  // This function updates the form data state when input fields change
  // It uses the spread operator to maintain existing form data while updating the specific field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // The component renders a registration form
  // It includes fields for firstname, lastname, email, password, and confirm password
  // It also includes a submit button and a link to the login page
  // The form uses the handleRegister function to submit data
  // and the handleChange function to update form data state
  // The component uses CSS for styling
  // and react-hot-toast for user notifications
  // The component renders a registration form
  // It includes fields for firstname, lastname, email, password, and confirm password
  // It also includes a submit button and a link to the login page
  // The form uses the handleRegister function to submit data
  // and the handleChange function to update form data state 
  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" name="firstname" placeholder="Firstname" value={formData.firstname} onChange={handleChange} required />
        <input type="text" name="lastname" placeholder="Lastname" value={formData.lastname} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Register;
