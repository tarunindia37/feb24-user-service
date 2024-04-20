import User from '../models/User.js';

export const isLogin = () => {
  return async (req, res, next) => {
    if (req.session?._id) {
      const user = await User.findOne({ _id: req.session._id }).select(
        '-password'
      );
      if (user) {
        req.user = user;
        req.isLogin = true;
      }
    }
    next();
  };
};
