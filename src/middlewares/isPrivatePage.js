import route from './../routes/route.json' assert { type: 'json' };

const isPrivatePage = () => {
  return (req, res, next) => {
    if (req.isLogin) {
      return next();
    } else {
      res.redirect(route.LOGIN);
    }
  };
};

export default isPrivatePage;
