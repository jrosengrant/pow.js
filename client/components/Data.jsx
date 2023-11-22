import React from 'react';

const Data = ({ weatherData }) => {
  //   console.log(weatherData);

  //custom function to map an object to an array of list items
  function objectMap(obj, cb) {
    if (typeof obj !== 'object')
      return new Error(`Error: ${obj} is not an object`);
    const newArr = [];
    for (let index = 0; index < Object.keys(obj).length; index++) {
      let statName = Object.keys(obj)[index];
      let statValue = obj[statName];
      newArr.push(cb(statName, statValue, index));
    }
    return newArr;
  }

  const current = objectMap(
    weatherData.current,
    (statName, statValue, index) => (
      <li key={`c${index}`}>
        {statName}: {statValue}
      </li>
    )
  );
  //   console.log(current);

  const daily = objectMap(weatherData.current, (stat, index) => (
    <li key={index}>
      `${stat}:` {stat}
    </li>
  ));

  return (
    <div className="data">
      <h4>Current Weather Conditions</h4>
      <div className="current-data">
        <ul>{current}</ul>
      </div>
    </div>
  );
};

export default Data;
