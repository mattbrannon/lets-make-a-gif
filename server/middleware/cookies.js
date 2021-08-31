const cookieParser = require('cookie-parser');

const cookieSetter = (req, res, next) => {
  const cookies = cookieParser.JSONCookies(req.cookies);
  if (!('id' in cookies)) {
    const id = Date.now().toString();
    res.locals.userId = id;
    req.userId = id;
    res.cookie('id', id, { maxAge: 31500000000, httpOnly: true });
  }
  else {
    res.locals.userId = cookies.id;
    req.userId = cookies.id;
  }

  next();
};

module.exports = { cookieSetter };
