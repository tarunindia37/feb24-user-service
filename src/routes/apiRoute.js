import express from 'express';
import route from './route.json' assert { type: 'json' };
import weatherRoute from './weather.js';
import usersRoute from './users.js';

const apiRoute = express.Router();

apiRoute.use(route.WEATHER, weatherRoute);
apiRoute.use(route.USERS, usersRoute);

export default apiRoute;
