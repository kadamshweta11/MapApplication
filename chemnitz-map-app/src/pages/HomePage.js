import React,{useState,useEffect} from 'react';
import MapView from '../components/MapView';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../Styling/Home.css'; // Import the CSS file for styling


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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login'); // Redirect to login page
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This function should set homeCoordinates after geocoding homeAddress
    geocodeAddress(homeAddress);
  };

  const geocodeAddress=async(address)=>{
    const provider=new OpenStreetMapProvider();
    const results=await provider.search({query:address});
    if(results && results.length>0){
      const{x,y}=results[0];
      setHomeCoordinates([y,x]);
    }else{
      alert('Address Not Found!');
    }
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
          <form onSubmit={handleSubmit}>
            <div>
              <label>Favourite Facility</label>
              <select value={favouriteFacility} onChange={(e) => setFavouriteFacility(e.target.value)}>
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

