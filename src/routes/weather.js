import express from 'express';
import route from './route.json' assert { type: 'json' };
import { getWeather } from '../controllers/weather.js';

const weatherRoute = express.Router();

weatherRoute.get(route.ROOT, getWeather);

export default weatherRoute;
