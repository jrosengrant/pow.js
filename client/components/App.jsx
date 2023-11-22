import React from 'react';
import { useEffect, useState } from 'react';
import MainContainer from './MainContainer.jsx';
import params from '../../db/params.json';

const App = () => {
  const [entriesList, updateEntriesList] = useState([]);
  // consider adding states for units:
  // temperature, wind speed, precipitation, timezone
  // consider creating a state variable for which params to pull from the API
  // control params with radio buttons, on click it updates params state var

  // useEffect to GET entries list any time something updates
  useEffect(() => {
    async function fetchEntries() {
      // const response = await fetch('http://localhost:3000/entries');
      const response = await fetch('/entries');
      const result = await response.json();
      console.log('GET result in react app: ', result);
      updateEntriesList(result);
    }
    fetchEntries();
  }, []);

  // button click handler to send POST request
  async function handleButtonClick(name, lat, long) {
    // SIMPLE TEST
    // fetch('http://localhost:3000/entries').then((response) => {
    //   console.log(response);
    //   console.log(response.json());
    // });

    // define request body
    const reqBody = {
      name: name,
      latitude: lat,
      longitude: long,
      ...params,
    };
    try {
      console.log(JSON.stringify(reqBody));
      const response = await fetch('/entries', {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
          'Content-type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
        },
      });
      const result = await response.json();
      console.log('post result in react app: ', result);
    } catch (err) {
      return new Error('Error: fetch request on button click.');
    }
  }

  return (
    <div>
      {/* <span>Testing react App?! It works! Maybe?</span> */}
      <MainContainer
        entriesList={entriesList}
        handleClick={handleButtonClick}
      />
    </div>
  );
};

export default App;
