import express from 'express';
import { displayUsers } from '../controllers/users.js';
import route from './route.json' assert { type: 'json' };
import upload from '../utils/upload.js';
import { signup } from '../controllers/signup.js';
import { login } from '../controllers/login.js';
import isPrivatePage from '../middlewares/isPrivatePage.js';

const pageRoute = express.Router();

// private page
pageRoute.get(route.SHOW_USERS, isPrivatePage(), displayUsers);

pageRoute
  .route(route.LOGIN)
  .get((req, res) => {
    if (req.isLogin) return res.redirect(route.ROOT);
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
    if (req.isLogin) return res.redirect(route.ROOT);
    return res.render('signUp', {
      isSuccess: false,
      isError: false,
      errorMsg: '',
    });
  })
  .post(upload.single('avatar'), signup);

pageRoute.get(route.ROOT, (req, res) => {
  return res.render('home', {
    first_name: req?.user?.first_name,
    isLogin: req?.isLogin,
  });
});

pageRoute.get(route.LOGOUT, (req, res) => {
  req.session._id = null;
  res.redirect(route.LOGIN);
});

export default pageRoute;
