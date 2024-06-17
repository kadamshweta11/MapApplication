import React, { useState, useEffect } from 'react';
import MapView from '../components/MapView';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { Link, useNavigate } from 'react-router-dom';
import '../Styling/Home.css';
import NavBar from '../components/NavBar';
// import Footer from '../components/Footer';
import { getUserDataById } from '../api'; // Assuming you have an API function to fetch user data

const HomePage = () => {
  const [favouriteFacility, setFavouriteFacility] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [homeCoordinates, setHomeCoordinates] = useState(null);
  const [nearestFacilityList, setNearestFacilityList] = useState([]);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const userData = await getUserDataById(userId); // Fetch user data
        setFavouriteFacility(userData.favoriteFacility);
        setHomeAddress(userData.homeAddress);
        setHomeCoordinates(userData.homeCoordinates.coordinates); // Set home coordinates from fetched data
        setUsername(userData.username); // Set username if available
        setIsLoading(false); // Turn off loading state after data is fetched
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false); // Handle error case: turn off loading state
        // Optionally, handle error state or display a message to the user
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures useEffect runs once on mount

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login'); // Redirect to login page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission for filtering or updating data
    const results = await geocodeAddress(homeAddress);
    if (results && results.length > 0) {
      const { x, y } = results[0];
      const coordinates = [y, x];
      setHomeCoordinates(coordinates);
      updateHomeAddress(homeAddress, { type: 'Point', coordinates });
    } else {
      alert('Address Not Found!');
    }
  };

  const geocodeAddress = async (address) => {
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query: address });
    return results;
  };

  const updateHomeAddress = async (homeAddress, homeCoordinates) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch('http://localhost:5000/api/user/updateHomeAddress', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, homeAddress, homeCoordinates }),
      });
      const data = await response.json();
      if (response.ok) {
        setHomeAddress(data.homeAddress);
        setHomeCoordinates(data.homeCoordinates.coordinates);
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.error('Error updating home address:', error);
    }
  };

  const handleFavouriteChange = async (e) => {
    const selectedFacility = e.target.value;
    setFavouriteFacility(selectedFacility);
    await updateFavoriteFacility(selectedFacility);
  };

  const updateFavoriteFacility = async (favoriteFacility) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch('http://localhost:5000/api/user/updateFavoriteFacility', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, favoriteFacility }),
      });
      const data = await response.json();
      if (response.ok) {
        setFavouriteFacility(data.favoriteFacility);
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.error('Error updating favorite facility:', error);
    }
  };

  return (
    <div className='flex-container'>
    <div className='homepage-container'>
      {/* <header className='header'>
        <h1>Facilities in Chemnitz</h1>
        <div className="user-info">
          <span>{username}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header> */}
      <NavBar username={username}/>
      <div className="body-content">
        {!isLoading ? (
          <>
            <div className="map-container">
              {homeCoordinates && (
                <MapView
                  favouriteFacility={favouriteFacility}
                  homeCoordinates={homeCoordinates}
                  setNearestFacilityList={setNearestFacilityList}
                />
              )}
            </div>
            <div className="sidebar">
              <Link to="/userprofile">View Profile</Link>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Favourite Facility</label>
                  <select value={favouriteFacility} onChange={handleFavouriteChange}>
                    <option value="">Select a Facility</option>
                    <option value="schools">Schools</option>
                    <option value="kindergardens">Kindergardens</option>
                    <option value="socialChildProjects">Social Child Projects</option>
                    <option value="socialTeenagerProjects">Social Teenager Projects</option>
                  </select>
                </div>
                <div>
                  <label>Home Address:</label>
                  <input
                    type="text"
                    value={homeAddress}
                    onChange={(e) => setHomeAddress(e.target.value)}
                    placeholder='Enter Your Home Address'
                  />
                </div>
                <button type="submit">Filter</button>
              </form>
              <div>
                <h2>Nearest Facilities</h2>
                <ol>
                  {nearestFacilityList.map((facility, index) => (
                    <li key={index}>
                      <strong>{facility.name}</strong> - {facility.distance.toFixed(2)} km
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
     <div>
     <footer className="footer">
      <p>&copy; 2024 Chemnitz Facilities. All rights reserved.</p>
    </footer>
     </div>
    </div>
    </div>
    
  );
};

export default HomePage;
