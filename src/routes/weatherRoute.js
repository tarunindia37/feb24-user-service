import express from 'express';
import route from './route.json' assert { type: 'json' };

const weatherRoute = express.Router();

weatherRoute.get(route.ROOT, async (req, res) => {
  const { city } = req.query;
  const resp = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=hours%2Cdays%2Ccurrent&key=${process.env.WEATHER_API_KEY}&contentType=json`
  );
  const data = await resp.json();
  return res.json(data);
});

export default weatherRoute;
