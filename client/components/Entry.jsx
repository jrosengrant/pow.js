import React from 'react';
import Data from './Data.jsx';

const Entry = (props) => {
  const { name, latitude, longitude, weatherData } = props;

  // consider making weatherData its own jsx object
  return (
    <div className="entry">
      <div className="name">Name: {name}</div>
      <div className="latitude">Latitude: {latitude}</div>
      <div className="longitude">Longitude: {longitude}</div>
      <Data weatherData={weatherData} />
    </div>
  );
};

export default Entry;
