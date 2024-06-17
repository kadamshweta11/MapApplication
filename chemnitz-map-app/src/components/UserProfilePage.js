// UserProfilePage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../Styling/Profile.css';
// import Footer from '../components/Footer';

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
    <div className="container">
      <NavBar />
      <main className="main-content">
      <Link to="/">View Home</Link>
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
         <div className="profile-card">
      <table >
  <tr>
    <th>Username</th>
    <td>{userData.username}</td>
  </tr>
  <tr>
    <th>Email</th>
    
    <td>{userData.email}</td>
  </tr>
  <tr>
    <th>Favorite Facility:</th>
    <td>{userData.favoriteFacility}</td>
   
  </tr>
  <tr>
    <th>Home Address</th>
    <td>{userData.homeAddress}</td>
   
  </tr>
  <tr>
    <th>Home Coordinates</th>
    <td>{userData.homeCoordinates.coordinates.join(', ')}</td>
   
  </tr>

  {/* Additional fields as needed */}
      <tr>
        <td><button onClick={() => setEditMode(true)}>Update Profile</button></td>
        <td><button onClick={handleDelete}>Delete Account</button></td>
      </tr>
      
      
      </table>
    </div>
     )}
     </main>
     <div className='foot-cont'>
 <footer className="footer">
      <p>&copy; 2024 Chemnitz Facilities. All rights reserved.</p>
    </footer>
    </div>
    </div>
    
  );
};

export default UserProfilePage;
