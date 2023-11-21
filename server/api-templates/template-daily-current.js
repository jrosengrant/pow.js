import { fetchWeatherApi } from 'openmeteo';

const params = {
  latitude: 45.03,
  longitude: 70.31,
  current: [
    'temperature_2m',
    'relative_humidity_2m',
    'is_day',
    'precipitation',
    'wind_speed_10m',
    'wind_gusts_10m',
  ],
  daily: ['temperature_2m_max', 'temperature_2m_min', 'sunrise', 'sunset'],
  temperature_unit: 'fahrenheit',
  wind_speed_unit: 'mph',
  precipitation_unit: 'inch',
  timezone: 'auto',
  forecast_days: 1,
};
const url = 'https://api.open-meteo.com/v1/forecast';
const responses = await fetchWeatherApi(url, params);

// Helper function to form time ranges
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const utcOffsetSeconds = response.utcOffsetSeconds();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const latitude = response.latitude();
const longitude = response.longitude();

const current = response.current();
const daily = response.daily();

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
  current: {
    time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
    temperature2m: current.variables(0).value(),
    relativeHumidity2m: current.variables(1).value(),
    isDay: current.variables(2).value(),
    precipitation: current.variables(3).value(),
    windSpeed10m: current.variables(4).value(),
    windGusts10m: current.variables(5).value(),
  },
  daily: {
    time: range(
      Number(daily.time()),
      Number(daily.timeEnd()),
      daily.interval()
    ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
    temperature2mMax: daily.variables(0).valuesArray(),
    temperature2mMin: daily.variables(1).valuesArray(),
    sunrise: daily.variables(2).valuesArray(),
    sunset: daily.variables(3).valuesArray(),
  },
};
console.log(weatherData);
