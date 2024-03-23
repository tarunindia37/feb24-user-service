import express from 'express';
import apiRoute from './routes/apiRoute.js';
import route from './routes/route.json' assert { type: 'json' };

const app = express();

// Middlewares
// Parse URL-encoded bodies (forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (API requests)
app.use(express.json());

// Routes
app.use(route.API, apiRoute);

export default app;
