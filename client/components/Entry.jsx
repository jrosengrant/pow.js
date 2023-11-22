import React from 'react';
import Data from './Data.jsx';

const Entry = (props) => {
  const { name, latitude, longitude, weatherData, fetchEntries } = props;

  async function deleteButtonClick() {
    const name = { name };
    try {
      const response = await fetch('/entries', {
        method: 'delete',
        body: JSON.stringify(name),
      });
      const result = await response.json();
      console.log('delete request response: ', result);
      fetchEntries();
    } catch (err) {
      return new Error({
        log: 'Error: fetch DELETE request on button click failed.',
        message: `${err.message}`,
      });
    }
  }

  // consider making weatherData its own jsx object
  return (
    <div className="entry">
      <div className="entry-headers">
        <div className="top">
          <div className="name">{name}</div>
          <button className="delete-button">
            {/* <img src="../assets/trash-can.png"></img> */}
          </button>
        </div>
        <div className="latitude">
          Latitude: <br></br>
          {latitude} {latitude >= 0 ? 'N' : 'S'}
        </div>
        <div className="longitude">
          Longitude: <br></br>
          {longitude} {longitude >= 0 ? 'E' : 'W'}
        </div>
        <div className="delete-container"></div>
      </div>
      <Data weatherData={weatherData} />
    </div>
  );
};

export default Entry;
