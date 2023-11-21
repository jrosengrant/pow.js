const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  weatherData: { type: Object, required: true },
});

const weatherModel = mongoose.model('Location', weatherSchema);

module.exports = weatherModel;
