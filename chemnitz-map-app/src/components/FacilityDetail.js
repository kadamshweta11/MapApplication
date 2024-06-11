import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSchools } from '../api';  // Import appropriate function from api.js

const FacilityDetail = () => {
  const { id } = useParams();
  const [facility, setFacility] = useState(null);

  useEffect(() => {
    getSchools(id).then(res => setFacility(res.data));
  }, [id]);

  return (
    <div>
      {facility ? (
        <>
          <h2>{facility.name}</h2>
          <p>{facility.address}</p>
          {/* Add more facility details */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FacilityDetail;
