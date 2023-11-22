import React from 'react';
import Entry from './Entry.jsx';

const MainContainer = ({ entriesList, handleClick }) => {
  let entries = [];
  for (let i = 0; i < entriesList.length; i++) {
    let el = entriesList[i];
    entries.push(
      <Entry
        key={`e${i}`}
        name={el.name}
        latitude={el.latitude}
        longitude={el.longitude}
        weatherData={el.weatherData}
      />
    );
  }

  return (
    <div id="main-container">
      <div id="entry-creator">
        <label htmlFor="latitude">Latitude</label>
        <input
          type="text"
          id="latitude-input"
          name="Latitude"
          placeholder="Latitude (decimal)"
        ></input>
        <br></br>
        <label htmlFor="longitude">Longitude</label>
        <input
          type="text"
          id="longitude-input"
          name="Longitude"
          placeholder="Longitude (decimal)"
        ></input>
        <br></br>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name-input"
          name="name"
          placeholder="Location name..."
        ></input>
        <br></br>
        <button
          id="create-entry-button"
          onClick={() => {
            const name = document.getElementById('name-input').value;
            const latitude = document.getElementById('latitude-input').value;
            const longitude = document.getElementById('longitude-input').value;
            handleClick(name, latitude, longitude);
          }}
        >
          Create new location entry
        </button>
      </div>
      <div id="entry-container">{entries}</div>
    </div>
  );
};

export default MainContainer;
