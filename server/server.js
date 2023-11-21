const express = require('express');
const app = express();
const path = require('path');
const weatherController = require('./weatherController.js');
const mongoose = require('mongoose');
require('dotenv').config();

// base routes here
app.use('/build', express.static(path.join(__dirname, '../build')));
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// set up get request to /entries to read current locations in the DB
app.get(
  '/entries',
  () => {
    console.log('Made it to entries route! Onwards to weatherController!');
  },
  weatherController.getEntries,
  (req, res) => {
    return res.status(200).json(res.locals.entriesList);
  }
);

// set up post request to /locations to create a new location entry and fetch from API
app.post('/entries', weatherController.createEntry, (req, res) => {
  return res.status(200).json(res.locals.entry);
});

app.get('*', (req, res) => {
  res.status(404).send('Invalid endpoint, file not found.');
});

// global err handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Error encountered from unknown origin.',
    status: 500,
    message: { err: `${err.message}` },
  };
  const errorObj = {
    ...defaultErr,
    err,
  };
  console.log(err);
  return res.status(errObj.status).json(errorObj.message);
});

// server listener
app.listen(3000, async () => {
  console.log('Listening on Port 3000...');
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log('Connected to Mongo DB.');
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
