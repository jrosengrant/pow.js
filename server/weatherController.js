const fetchWeather = require('./fetch-weather.js');
const db = require('../db/entries.js');

const weatherController = {};

weatherController.getEntries = (req, res, next) => {
  const entriesList = db.read();
  res.locals.entriesList = entriesList;
  return next();
};

weatherController.createEntry = async (req, res, next) => {
  // first fetch weather info from API using req body
  try {
    console.log('reqbody in weatherController post: ', req.body);
    const weatherData = await fetchWeather(req.body);
    console.log('returned weatherData in controller post: ', weatherData);
    const entry = {
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    };
    db.write(entry);
    res.locals = entry;
    return next();
  } catch (err) {
    return next({
      log: 'Error in weatherController.createEntry function.',
      message: { err: `${err}` },
    });
  }
};

modules.exports = weatherController;
