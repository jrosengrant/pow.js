const fetchWeather = require('./fetch-weather.js');
// const db = require('../db/entries.js');
const Location = require('../mongodb/weatherModel.js');

const weatherController = {};

weatherController.getEntries = (req, res, next) => {
  //   console.log('Made it to the weatherController.getEntries function!');
  const entriesList = Location.find({})
    .exec()
    .then((response) => {
      //   console.log('getEntries list: ', response);
      res.locals.entriesList = response;
      return next();
    });
};

weatherController.createEntry = async (req, res, next) => {
  try {
    // check request body
    console.log('reqbody in weatherController post: ', req.body);
    if (!Object.keys(req.body).length)
      return next({
        log: 'Error: Post request body is empty!',
        message: 'Error: Post request body is empty!',
      });

    // fetch weatherdata for passed location from openmeteo API and log result
    const weatherData = await fetchWeather(req.body);
    console.log('returned weatherData in controller post: ', weatherData);

    // create entry object that will populate mongoDB document
    const entry = {
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      weatherData: weatherData,
    };

    // console.log('entry in post: ', entry);
    // create document in mongoDB and log response
    // const document = new Location({ entry }).save();
    Location.create(entry).then((response) => {
      console.log('mongoose response: ', response);
    });
    // console.log('document in post: ', document);
    // res.locals.entry = document;
    res.locals.entry = entry;
    return next();
  } catch (err) {
    return next({
      log: 'Error in weatherController.createEntry function.',
      message: { err: `${err.message}` },
    });
  }
};

weatherController.deleteEntry = async (req, res, next) => {
  // get name of entry to delete from req body
  const name = req.body.name;

  try {
    // delete entry from mongo
    Location.deleteOne({ name: name }).then((response) => {
      console.log('mongoose delete response: ', response);
      res.locals.deleteResponse = response;
      return next();
    });
  } catch (err) {
    return next({
      log: 'Error in weatherController.deleteEntry function.',
      message: { err: `${err.message}` },
    });
  }
};

module.exports = weatherController;
