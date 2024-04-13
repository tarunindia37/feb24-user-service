import express from 'express';
import { displayUsers } from '../controllers/users.js';
import route from './route.json' assert { type: 'json' };

const pageRoute = express.Router();

pageRoute.get(route.SHOW_USERS, displayUsers);

pageRoute.get(route.LOGIN, (req, res) => {
  return res.render('login');
});

pageRoute.get(route.SIGNUP, (req, res) => {
  return res.render('signUp');
});

pageRoute.get(route.ROOT, (req, res) => {
  return res.render('home');
});

export default pageRoute;
