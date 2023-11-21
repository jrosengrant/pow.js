import React from 'react';
import { useEffect, useState } from 'react';
import MainContainer from './MainContainer.jsx';
import params from '../../db/params.json';

const App = () => {
  const [entriesList, updateEntriesList] = useState([]);

  // useEffect to GET entries list any time something updates
  useEffect(() => {
    async function fetchEntries() {
      const response = await fetch('http://localhost:8080/entries');
      const result = response.json();
      console.log('GET result in react app: ', result);
      updateEntriesList(result);
    }
    // fetchEntries();
    updateEntriesList(entriesList);
  });

  // button click handler to send POST request
  // async function handleButtonClick(name, lat, long) {
  //   // define request body
  //   const reqBody = {
  //     name: name,
  //     latitude: lat,
  //     longitude: long,
  //     ...params,
  //   };

  //   console.log(reqBody);

  //   const response = await fetch('http://localhost:3000/entries', {
  //     method: 'POST',
  //     body: JSON.stringify(reqBody),
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //     },
  //   });
  //   const result = await response.json();
  //   console.log('post result in react app: ', result);
  // }

  return (
    <div>
      <span>Testing react App?! It works! Maybe?</span>
      <MainContainer entriesList={entriesList} />
    </div>
  );
};

export default App;
