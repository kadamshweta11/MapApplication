import React from 'react';
import { Link } from 'react-router-dom';

const FacilityList = ({ facilities }) => {
  return (
    <ul>
      {facilities.map(facility => (
        <li key={facility._id}>
          <Link to={`/facility/${facility._id}`}>{facility.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default FacilityList;
