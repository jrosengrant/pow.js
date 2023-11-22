import React from 'react';

const Data = ({ weatherData }) => {
  console.log(weatherData);

  //custom function to map an object to an array of list items
  function objectMap(obj, cb) {
    if (typeof obj !== 'object')
      return new Error(`Error: ${obj} is not an object`);
    const newArr = [];
    for (let key in obj) {
      newArr.push(cb(obj[key]));
    }
    return newArr;
  }

  console.log(typeof weatherData.current);
  const current = objectMap(weatherData.current, (stat, index) => (
    <li key={index}>
      `${stat}:` {stat}
    </li>
  ));
  console.log(current);

  const daily = objectMap(weatherData.current, (stat, index) => (
    <li key={index}>
      `${stat}:` {stat}
    </li>
  ));

  return (
    <div className="data">
      <h4>Current</h4>
      <div className="current-data">
        <ul>{current}</ul>
      </div>
    </div>
  );
};

export default Data;
