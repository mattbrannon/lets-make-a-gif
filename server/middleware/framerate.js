const getFramerate = (n) => {
  while (n > 15) {
    n = n / 2;
  }
  return Math.floor(n);
};

const setFramerate = (req, res, next) => {
  const filters = JSON.parse(req.body.filters);
  if (filters.framerate <= 1) {
    filters.framerate = getFramerate(req.files.length);
    req.body.filters = JSON.stringify(filters);
  }
  next();
};

exports.getFramerate = getFramerate;
exports.setFramerate = setFramerate;
