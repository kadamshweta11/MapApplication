// UserProfilePage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false); // State for edit mode
  const [updatedData, setUpdatedData] = useState({}); // State for updated user data
const navigate=useNavigate(); // Initialize useNavigate hook
  useEffect(() => {
    // Fetch user data from backend API
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data); // Update state with fetched user data
        setUpdatedData(response.data); // Initialize updated data with fetched user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Run only once on component mount

  
  const handleDelete=async()=>{
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    try {
      await axios.delete(`http://localhost:5000/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/register'); // Redirect to register page after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const handleUpdate=async()=>{
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    try {
      await axios.put(`http://localhost:5000/api/user/${userId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setUserData(updatedData);
      setEditMode(false); // Exit edit mode after successful update
    } catch (error) {
      console.log('Error updating user:', error);
    }
  };
  if (!userData) {
    return <div>Wait To Get User Data Loading...</div>; // Placeholder for loading state
  }
//   const { username, email, favoriteFacility, homeAddress, homeCoordinates } = userData;
  return (
    <div>
     <h2>User Profile</h2>
     {editMode ? (
      <div>
        <label>
            Username:
            <input
              type="text"
              value={updatedData.username}
              onChange={(e) => setUpdatedData({ ...updatedData, username: e.target.value })}
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              value={updatedData.email}
              onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
            />
          </label>

          <label>
            Favorite Facility:
            <select
              value={updatedData.favoriteFacility}
              onChange={(e) => setUpdatedData({ ...updatedData, favoriteFacility: e.target.value })}
            >
              <option value="schools">Schools</option>
              <option value="kindergardens">Kindergardens</option>
              <option value="socialChildProjects">Social Child Projects</option>
              <option value="socialTeenagerProjects">Social Teenager Projects</option>
            </select>
          </label>

          <label>
            Home Address:
            <input
              type="text"
              value={updatedData.homeAddress}
              onChange={(e) => setUpdatedData({ ...updatedData, homeAddress: e.target.value })}
            />
          </label>

          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>

      </div>
     ):(
         <div>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <p>Favorite Facility: {userData.favoriteFacility}</p>
      <p>Home Address: {userData.homeAddress}</p>
      <p>Home Coordinates: {userData.homeCoordinates.coordinates.join(', ')}</p>
      {/* Additional fields as needed */}
      <button onClick={() => setEditMode(true)}>Edit</button>
      <button onClick={handleDelete}>Delete Account</button>
    </div>
     )}
    </div>
  );
};

export default UserProfilePage;
