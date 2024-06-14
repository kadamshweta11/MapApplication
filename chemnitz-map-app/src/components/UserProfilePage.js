// UserProfilePage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfilePage = () => {
  const [userData, setUserData] = useState(null);

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
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Run only once on component mount

  if (!userData) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <p>Favorite Facility: {userData.favoriteFacility}</p>
      <p>Home Address: {userData.homeAddress}</p>
      {/* Additional fields as needed */}
    </div>
  );
};

export default UserProfilePage;
