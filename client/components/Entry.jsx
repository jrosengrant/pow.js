import React from 'react';
import Data from './Data.jsx';

const Entry = (props) => {
  const { name, latitude, longitude, weatherData, fetchEntries } = props;

  async function deleteButtonClick(name) {
    const confirmation = confirm(
      `Are you sure you want to delete the location ${name}?`
    ); // returns true/false
    if (!confirmation) return; // if user chose cancel, break out of function

    const nameToDelete = { name: name };
    // console.log(JSON.stringify(nameToDelete));
    try {
      const response = await fetch('/entries', {
        method: 'DELETE',
        body: JSON.stringify(nameToDelete),
        headers: {
          'Content-type': 'application/json',
        },
      });
      // console.log('response', response);
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
          <div className="delete-container ">
            <button
              className="delete-button "
              onClick={() => {
                deleteButtonClick(name);
              }}
            >
              {/* <img src="../assets/trash-can.png"></img> */}
            </button>
          </div>
        </div>
        <div className="latitude">
          Latitude: <br></br>
          {latitude} {latitude >= 0 ? 'N' : 'S'}
        </div>
        <div className="longitude">
          Longitude: <br></br>
          {longitude} {longitude >= 0 ? 'E' : 'W'}
        </div>
      </div>
      <Data weatherData={weatherData} />
    </div>
  );
};

export default Entry;
