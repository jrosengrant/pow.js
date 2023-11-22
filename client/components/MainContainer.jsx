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
        <input type="text" name="Latitude"></input>
        <br></br>
        <label htmlFor="latitude">Longitude</label>
        <input type="text" name="Longitude"></input>
        <br></br>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name"></input>
        <br></br>
        <button id="create-entry" onClick={handleClick}>
          Create new location entry
        </button>
      </div>
      <div id="entries-container">{entries}</div>
    </div>
  );
};

export default MainContainer;
