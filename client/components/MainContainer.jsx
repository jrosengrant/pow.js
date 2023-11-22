import React from 'react';
import Entry from './Entry.jsx';

const MainContainer = ({ entriesList, handleClick, fetchEntries }) => {
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
        fetchEntries={fetchEntries}
      />
    );
  }

  return (
    <div id="main-container">
      <div id="user-input-container">
        <div id="entry-creator">
          <label htmlFor="latitude" className="input-label">
            Latitude
          </label>
          <input
            type="text"
            id="latitude-input"
            name="Latitude"
            placeholder="Latitude (decimal)"
          ></input>
          <label htmlFor="longitude" className="input-label">
            Longitude
          </label>
          <input
            type="text"
            id="longitude-input"
            name="Longitude"
            placeholder="Longitude (decimal)"
          ></input>
          <label htmlFor="name" className="input-label">
            Name:
          </label>
          <input
            type="text"
            id="name-input"
            name="name"
            placeholder="Location name..."
          ></input>
          <button
            id="create-entry-button"
            onClick={() => {
              const name = document.getElementById('name-input').value;
              const latitude = document.getElementById('latitude-input').value;
              const longitude =
                document.getElementById('longitude-input').value;
              handleClick(name, latitude, longitude);
            }}
          >
            Create new location entry
          </button>
        </div>
        <div id="user-selection">
          Settings
          <div id="dropdown-container">
            <div id="temp-container">
              <label htmlFor="temperature">Temperature</label>
              <select name="temperature" id="temp-select">
                <option value="fahrenheit">Fahrenheit °F</option>
                <option value="celcius">Celcius °C</option>
              </select>
            </div>
            <div id="precip-container">
              <label htmlFor="precipitation">Precipitation</label>
              <select name="precipitation" id="precip-select">
                <option value="inch">Inch</option>
                <option value="millimeter">Millimeter</option>
              </select>
            </div>
            <div id="windspeed-container">
              <label htmlFor="windspeed">Wind speed</label>
              <select name="windspeed" id="windspeed-select">
                <option value="Mph">Mph</option>
                <option value="Km/h">Km/h</option>
                <option value="M/s">M/s</option>
                <option value="Knots">Knots</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div id="entry-container">{entries}</div>
    </div>
  );
};

export default MainContainer;
