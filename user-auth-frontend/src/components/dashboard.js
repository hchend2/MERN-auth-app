//
// File: user-auth-frontend/src/components/dashboard.js
//
// This component displays the user's dashboard after successful login
// It fetches user data from the backend and displays it
// 

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';


const Dashboard = () => {
  const [user, setUser] = useState(null); // State to hold user data ...
  const navigate = useNavigate(); // Hook to programmatically navigate ...


  const API_URL = process.env.REACT_APP_API_URL ; // Base URL for API requests ...
  
  // Function to fetch user data ...
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from local storage ...
      if (!token) {
        navigate('/login'); // Redirect to login if no token is found ...
        return;
      }
      const response = await axios.get(`${API_URL}/auth/user`, // API endpoint to get user data ...
      { 
        headers: { Authorization: `Bearer ${token}` }, // Include token in request headers ...
      });

      setUser(response.data); // Set user data in state ...

    } catch (error) {
      console.error('Error fetching user data:', error);
      navigate('/login'); // Redirect to login on error ...
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data on component mount ...
  }, []); // Empty dependency array means this effect runs once after the initial render ...

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