import bcrypt from 'bcrypt';
import User from '../models/User.js';
import route from './../routes/route.json' assert { type: 'json' };
import { isEmailValid } from '../utils/validator.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  // email & password valid
  if (!(email && isEmailValid(email) && password && password.length >= 5)) {
    return res.render('login', {
      isSuccess: false,
      isError: true,
      errorMsg: 'email and password validation failed',
    });
  }
  // fetch the data from DB (email)
  const user = await User.findOne({ email });
  if (!user) {
    return res.render('login', {
      isSuccess: false,
      isError: true,
      errorMsg: 'User not found, please signup.',
    });
  }
  // password convert to hash
  // match the both hash password
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.render('login', {
      isSuccess: false,
      isError: true,
      errorMsg: 'Authentication failed',
    });
  }

  req.session._id = user._id;
  // generate session cookie
  //return res.render('home');
  return res.redirect(route.ROOT);
};
