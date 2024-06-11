import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getSchools, getKindergardens, getSocialChildProjects, getSocialTeenagerProjects } from '../api';
import 'bootstrap-icons/font/bootstrap-icons.css';


//define custom icons using bootstrap icons and leaflet's L.divIcon
const createCustomIcon = (color, name) => L.divIcon({
  html: `<div style="display: flex; flex-direction: column; align-items: center;">
           <i class="bi bi-geo-alt-fill" style="color:${color}; font-size:1.5rem;"></i>
           <div  padding: 2px 5px; border: 1px solid #ccc; font-size: 0.75rem; text-align: center;">
             <strong>${name}</strong>
           </div>
         </div>`,
  className: 'custom-icon',
  iconAnchor: [12, 41] // Adjust this to position the icon correctly
});

// const schoolIcon=createCustomIcon('blue');
// const kindergardenIcon=createCustomIcon('green');
// const socialChildProjectIcon=createCustomIcon('violet');
// const socialTeenagerProjectIcon=createCustomIcon('red');
const homeIcon = createCustomIcon('#EA4335', '2rem', 'bold'); // Custom icon for home address

const MapView = ({favouriteFacility,homeCoordinates,setNearestFacilityList}) => {
  const [schools, setSchools] = useState([]);
  const [kindergardens, setKindergardens] = useState([]);
  const [socialChildProjects, setSocialChildProjects] = useState([]);
  const [socialTeenagerProjects, setSocialTeenagerProjects] = useState([]);
  const [filteredFacilities,setFilteredFacilities]=useState([]);
  // const [nearestFacilityList, setNearestFacilityList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schoolsData = await getSchools();
        setSchools(schoolsData.data);

        const kindergardensData = await getKindergardens();
        setKindergardens(kindergardensData.data);

        const socialChildProjectsData = await getSocialChildProjects();
        setSocialChildProjects(socialChildProjectsData.data);

        const socialTeenagerProjectsData = await getSocialTeenagerProjects();
        setSocialTeenagerProjects(socialTeenagerProjectsData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(()=>{
    if(!homeCoordinates) return;
    const [homeLat,homeLng]=homeCoordinates;
    const radius=2;//this is radius in kilometers

    const haversineDistance=(lat1,lon1,lat2,lon2)=>{
      const toRad=(value)=>(value*Math.PI)/180;
      const R=6371;//Earths radius in km
      const dLat=toRad(lat2-lat1);
      const dLon=toRad(lon2-lon1);
      const a= Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c=2*Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R*c;
    };

    let facilities=[];
    switch(favouriteFacility){
      case 'schools':
        facilities=schools;
        break;
      case 'kindergardens':
        facilities=kindergardens;
        break;
      case 'socialChildProjects':
        facilities=socialChildProjects;
        break;
      case 'socialTeenagerProjects':
        facilities=socialTeenagerProjects;
        break;

        default:
          facilities=[];
    }
const filtered=facilities.filter(facility=>{
  if(facility.Y && facility.X){
    const distance=haversineDistance(homeLat,homeLng,facility.Y,facility.X);
    return distance<=radius;
  }
  return false;
});
// Sort facilities based on distance from the home address
const sortedFacilities = filtered.sort((a, b) => {
  const distanceA = haversineDistance(homeLat, homeLng, a.Y, a.X);
  const distanceB = haversineDistance(homeLat, homeLng, b.Y, b.X);
  return distanceA - distanceB;
});


const nearestFacilitiesSet = new Set();
    // Create a list of nearest facilities
    const nearestFacilities = sortedFacilities.map((facility) => {
      const distance = haversineDistance(homeLat, homeLng, facility.Y, facility.X);
      const name = facility.BEZEICHNUNG || facility.TRAEGER;
      if (!nearestFacilitiesSet.has(name)) {
        nearestFacilitiesSet.add(name);
        return { name, distance };
    }
    return null;
    }).filter((facility)=>facility!==null);
    
    setFilteredFacilities(sortedFacilities);
    setNearestFacilityList(nearestFacilities);
}, [favouriteFacility, homeCoordinates, schools, kindergardens, socialChildProjects, socialTeenagerProjects,setNearestFacilityList]);

// setFilteredFacilities(nearestFacilityList);
//   },[favouriteFacility,homeCoordinates,schools,kindergardens,socialChildProjects,socialTeenagerProjects]);
  
  const renderPopupContent = (facility, type) => {
    switch (type) {
      case 'schools':
        return (
          <div>
            <h4>{facility.BEZEICHNUNG}</h4>
            <p><strong>Address:</strong> {facility.STRASSE}, {facility.PLZ} {facility.ORT}</p>
            <p><strong>Type:</strong> {facility.ART}</p>
            <p><strong>Telephone:</strong> {facility.TELEFON}</p>
            <p><strong>Fax:</strong> {facility.FAX}</p>
            <p><strong>Email:</strong> {facility.EMAIL}</p>
            <p><strong>Website:</strong> <a href={facility.WWW} target="_blank" rel="noopener noreferrer">{facility.WWW}</a></p>
            <p><strong>Profile:</strong> {facility.PROFILE}</p>
            <p><strong>Provider:</strong> {facility.TRAEGER}</p>
          </div>
        );
      case 'kindergardens':
        return (
          <div>
            <h4>{facility.BEZEICHNUNG}</h4>
            <p><strong>Address:</strong> {facility.STRASSE}, {facility.PLZ} {facility.ORT}</p>
            <p><strong>Provider:</strong> {facility.TRAEGER}</p>
            <p><strong>Telephone:</strong> {facility.TELEFON}</p>
            <p><strong>Email:</strong> {facility.EMAIL}</p>
            <p><strong>Barrier-Free:</strong> {facility.BARRIEREFREI ? 'Yes' : 'No'}</p>
            <p><strong>Integrative:</strong> {facility.INTEGRATIV ? 'Yes' : 'No'}</p>
          </div>
        );
      case 'socialChildProjects':
        return (
          <div>
            <h4>{facility.TRAEGER}</h4>
            <p><strong>Services:</strong> {facility.LEISTUNGEN}</p>
            <p><strong>Address:</strong> {facility.STRASSE}, {facility.PLZ} {facility.ORT}</p>
            <p><strong>Telephone:</strong> {facility.TELEFON}</p>
          </div>
        );
      case 'socialTeenagerProjects':
        return (
          <div>
            <h4>{facility.TRAEGER}</h4>
            <p><strong>Services:</strong> {facility.LEISTUNGEN}</p>
            <p><strong>Address:</strong> {facility.STRASSE}, {facility.PLZ} {facility.ORT}</p>
            <p><strong>Telephone:</strong> {facility.TELEFON}</p>
            <p><strong>Fax:</strong> {facility.FAX}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
       {homeCoordinates && (
    <MapContainer center={[50.8359, 12.9293]} zoom={13} style={{ height: "100vh", width: "100%" }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

    {
      homeCoordinates &&(
        <Marker position={homeCoordinates} icon={homeIcon}>
          <Popup>
            <div>
              <h4>Home Address</h4>
              <p>This is Your Home Location</p>
            </div>
          </Popup>
        </Marker>
      )
    }
    {filteredFacilities.map(facility => (
      <Marker
        key={facility._id}
        position={[facility.Y, facility.X]}
        icon={
          favouriteFacility === 'schools'
          ? createCustomIcon('blue', facility.BEZEICHNUNG)
            : favouriteFacility === 'kindergardens'
            ? createCustomIcon('green', facility.BEZEICHNUNG)
            : favouriteFacility === 'socialChildProjects'
            ? createCustomIcon('violet', facility.TRAEGER)
            : createCustomIcon('red', facility.TRAEGER)
        }
      >
        <Popup>{renderPopupContent(facility, favouriteFacility)}</Popup>
        {/* <div className="facility-label">
            <strong>{facility.BEZEICHNUNG}</strong>
          </div> */}
      </Marker>
    ))}
    {/* <style>
        {`
          .facility-label {
            position: absolute;
            bottom: 8px;
            left: -25px;
            width: 100px;
            background-color: white;
            border: 1px solid #ccc;
            padding: 2px;
            font-size: 0.75rem;
            text-align: center;
          }
        `}
        </style> */}
  </MapContainer>
 )}
  
  </div>
  );
};

export default MapView;
