import express from 'express';
import cors from 'cors';
import session from 'express-session';
import apiRoute from './routes/apiRoute.js';
import route from './routes/route.json' assert { type: 'json' };
import removeExpressHeader from './middlewares/removeExpressHeader.js';
import logger from './middlewares/logger.js';
import {
  LOGGER_PATH,
  LOGGER_FOLDER_PATH,
  PUBLIC_FOLDER_PATH,
  UPLOADS_FOLDER_PATH,
} from './constants.js';
import appPages from './routes/pageRoute.js';
import { isLogin } from './middlewares/isLogin.js';

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    // resave: false,
    // saveUninitialized: false,
    // cookie: { secure: true },
  })
);

// Middlewares
app.use(
  cors({
    origin: '*',
    methods: 'GET,POST',
  })
);
// Parse URL-encoded bodies (forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (API requests)
app.use(express.json());

// Custom middlewares
app.use(logger(LOGGER_PATH));
app.use(removeExpressHeader());
app.use(isLogin());

// Middlewares to server static files
app.use(express.static(PUBLIC_FOLDER_PATH));
app.use(route.LOGS, express.static(LOGGER_FOLDER_PATH));
app.use(route.UPLOADS, express.static(UPLOADS_FOLDER_PATH));

// Routes
app.use(route.API, apiRoute);
app.use(route.ROOT, appPages);

export default app;
