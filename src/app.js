import express from 'express';
import apiRoute from './routes/apiRoute.js';
import route from './routes/route.json' assert { type: 'json' };
import removeExpressHeader from './middlewares/removeExpressHeader.js';
import logger from './middlewares/logger.js';
import {
  LOGGER_PATH,
  LOGGER_FOLDER_PATH,
  PUBLIC_FOLDER_PATH,
} from './constants.js';

const app = express();

// Middlewares
// Parse URL-encoded bodies (forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (API requests)
app.use(express.json());

// Middlewares to server static files
app.use(express.static(PUBLIC_FOLDER_PATH));
app.use(route.LOGS, express.static(LOGGER_FOLDER_PATH));

// Custom middlewares
app.use(logger(LOGGER_PATH));
app.use(removeExpressHeader());

// Routes
app.use(route.API, apiRoute);

export default app;
