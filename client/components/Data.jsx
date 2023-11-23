import React from 'react';
import params from '../params.json';
import paramsLabels from '../params-labels.json';

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

  // console.log(paramsLabels);
  // console.log(paramsLabels['is_day'].label);

  const localCleanFunctions = {
    cleanDecimal: function (num) {
      return num.toFixed(2);
    },
    cleanPercent: function (num) {
      return num;
    },
    cleanTime: function (isoTimeString) {
      const date = new Date(isoTimeString);
      const localDateTime = date.toLocaleString();
      return localDateTime;
    },
    cleanDaytime: function (binary) {
      return binary === 1 ? 'Yes' : 'No';
    },
  };
  // console.log(localCleanFunctions.cleanDecimal(20.2678));
  const current = objectMap(
    weatherData.current,
    (statName, statValue, index) => {
      // console.log('statname: ', statName);
      const cleanStatName = paramsLabels[statName].label;
      const cleanFunctionName = paramsLabels[statName].cleanFunction;
      let cleanStatValue;
      if (localCleanFunctions[cleanFunctionName]) {
        const cleanFunction = localCleanFunctions[cleanFunctionName];
        cleanStatValue = cleanFunction(statValue);
        // console.log('cleanvalue', cleanStatValue);
      } else {
        cleanStatValue = statValue;
      }
      const cleanStatUnit = paramsLabels[statName].unit;
      return (
        <li key={`c${index}`}>
          {cleanStatName}: {cleanStatValue} {cleanStatUnit}
        </li>
      );
    }
  );

  // old way with ugly return values
  // const current = objectMap(
  //   weatherData.current,
  //   (statName, statValue, index) => {
  //     return (
  //       <li key={`c${index}`}>
  //         {statName}: {statValue}
  //       </li>
  //     );
  //   }
  // );
  // console.log(current);

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
