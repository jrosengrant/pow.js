import React from 'react';
import Entry from './Entry.jsx';

const MainContainer = ({ entriesList, handleClick }) => {
  let entries = [];
  for (element of entriesList) {
    entries.push(
      <Entry
        name={element.name}
        latitude={element.latitude}
        longitude={element.longitude}
        weatherData={element.weatherData}
      />
    );
  }

  return (
    <div id="main-container">
      <div id="entry-creator">
        <label htmlFor="latitude">Latitude</label>
        <input type="text" name="Latitude"></input>
        <br></br>
        <label htmlFor="latitude">Longitude</label>
        <input type="text" name="Longitude"></input>
        <button id="create-entry" onClick={handleClick}>
          Create new location entry
        </button>
        <br></br>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name"></input>
      </div>
      <div id="entries-container">{entries}</div>
    </div>
  );
};

export default MainContainer;
