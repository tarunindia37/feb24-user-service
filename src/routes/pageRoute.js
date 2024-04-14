import express from 'express';
import { displayUsers } from '../controllers/users.js';
import route from './route.json' assert { type: 'json' };
import upload from '../utils/upload.js';
import { signup } from '../controllers/signup.js';
import { login } from '../controllers/login.js';

const pageRoute = express.Router();

pageRoute.get(route.SHOW_USERS, displayUsers);

pageRoute
  .route(route.LOGIN)
  .get((req, res) => {
    return res.render('login', {
      isSuccess: false,
      isError: false,
      errorMsg: '',
    });
  })
  .post(login);

pageRoute
  .route(route.SIGNUP)
  .get((req, res) => {
    return res.render('signUp', {
      isSuccess: false,
      isError: false,
      errorMsg: '',
    });
  })
  .post(upload.single('avatar'), signup);

pageRoute.get(route.ROOT, (req, res) => {
  console.log('====>>>', req?.user);
  return res.render('home', { first_name: req?.user?.first_name });
});

export default pageRoute;
