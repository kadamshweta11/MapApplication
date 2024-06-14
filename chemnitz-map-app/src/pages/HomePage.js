import React,{useState,useEffect} from 'react';
import MapView from '../components/MapView';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { Link,useNavigate } from 'react-router-dom'; // Import useNavigate
import '../Styling/Home.css'; // Import the CSS file for styling
// import { getUserDataByEmail } from '../api';

const HomePage = () => {
  const[favouriteFacility,setFavouriteFacility]=useState('');
  const[homeAddress,setHomeAddress]=useState('');
  const[homeCoordinates,setHomeCoordinates]=useState(null);
  const [nearestFacilityList, setNearestFacilityList] = useState([]);
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    // Retrieve the username from local storage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    // Fetch user data by email
    // const email = localStorage.getItem('username');
    // if (email) {
    //   getUserDataByEmail(email).then(data => {
    //     setFavouriteFacility(data.favoriteFacility);
    //     setHomeAddress(data.homeAddress);
    //     setHomeCoordinates(data.homeCoordinates.coordinates);
    //   }).catch(error => {
    //     console.error('Error fetching user data:', error);
    //   });
    // }

  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login'); // Redirect to login page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  const updateFavoriteFacility = async (favoriteFacility) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    console.log('User ID from localStorage:', userId);
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

  const updateHomeAddress = async (homeAddress, homeCoordinates) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    console.log('User ID from localStorage:', userId);
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
  const handleFavouriteChange = (e) => {
    const selectedFacility = e.target.value;
    setFavouriteFacility(selectedFacility);
    updateFavoriteFacility(selectedFacility);
  };
  return (
    <div className='homepage-container'>
      <header className='header'>
      <h1>Facilities in Chemnitz</h1>
      <div className="user-info">
      <span>{username}</span>
      <button onClick={handleLogout}>Logout</button>
      </div>
        {/* <div className="header-content">
          <h1>Facilities in Chemnitz</h1>
          <div className="user-info">
            <span>{username}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div> */}
      </header>
      <div className="body-content">
        <div className="map-container">
          <MapView favouriteFacility={favouriteFacility} 
          homeCoordinates={homeCoordinates}
          setNearestFacilityList={setNearestFacilityList} // Pass the setter to MapView
           />
        </div>
        <div className="sidebar">
        {/* <div>
            <h3>User Information:</h3>
            <p><strong>Username:</strong> {username}</p>
            <p><strong>Home Address:</strong> {homeAddress}</p>
            <p><strong>Favorite Facility:</strong>{favouriteFacility}</p>
            {homeCoordinates && (
              <p><strong>Home Coordinates:</strong> Latitude: {homeCoordinates[0]}, Longitude: {homeCoordinates[1]}</p>
            )}
          </div> */}
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
      </div>
      <footer className="footer">
        <p>&copy; 2024 Chemnitz Facilities. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;

