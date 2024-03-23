import express from 'express';
import route from './route.json' assert { type: 'json' };
import weatherRoute from './weatherRoute.js';
import usersRoute from './usersRoute.js';

const apiRoute = express.Router();

apiRoute.use(route.WEATHER, weatherRoute);
apiRoute.use(route.USERS, usersRoute);

export default apiRoute;
