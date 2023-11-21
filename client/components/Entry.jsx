import React from 'react';

const Entry = (props) => {
  const { name, latitude, longitude, weatherData } = props;

  // consider making weatherData its own jsx object
  return (
    <div className="entry">
      <div className="name">Name: {name}</div>
      <div className="latitude">Latitude: {latitude}</div>
      <div className="longitude">Longitude: {longitude}</div>
      <div className="weatherData">WeatherData: {weatherData}</div>
    </div>
  );
};

export default Entry;
