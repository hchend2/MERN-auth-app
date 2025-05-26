// dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
// This component displays the user's dashboard after successful login

const Dashboard = () => {
  const [user, setUser] = useState(null); // State to hold user data
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      if (!token) {
        navigate('/login'); // Redirect to login if no token is found
        return;
      }
      const response = await axios.get('http://localhost:5000/api/user', { // API endpoint to get user data
        headers: { Authorization: `Bearer ${token}` }, // Include token in request headers
      });
      setUser(response.data); // Set user data in state
    } catch (error) {
      console.error('Error fetching user data:', error);
      navigate('/login'); // Redirect to login on error
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data on component mount
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user ? `${user.firstname} ${user.lastname}` : 'User'}</h2>
      {user && (
        <div className="user-info">
          <p>Email: {user.email}</p>
          {/* Add more user information as needed */}
        </div>
      )}
      <button onClick={() => localStorage.removeItem('token') || navigate('/login')}>Logout</button>
    </div>
  );
}
export default Dashboard;
// This component displays the user's dashboard after successful login
// It fetches user data from the backend and displays it
// It also provides a logout button that clears the token and redirects to the login page