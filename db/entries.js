const fs = require('fs');
const path = require('path');

let writeLocation = path.join(__dirname, './entries.dev.json');
let entriesList = JSON.parse(fs.readFileSync(writeLocation));

const db = {};

db.write = (entry) => {
  fs.writeFileSync(writeLocation, JSON.stringify(data, null, 2));
};

db.read = () => {
  db.reset();
  return entriesList;
};

db.reset = () => {
  entriesList = JSON.parse(fs.readFileSync(writeLocation));
};

module.exports = db;
