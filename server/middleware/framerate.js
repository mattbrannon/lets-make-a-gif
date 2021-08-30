const fs = require('fs-extra');

const getFramerate = (n) => {
  while (n > 15) {
    n = n / 2;
  }
  return Math.floor(n);
};

const setFramerate = (req, res, next) => {
  const filters = JSON.parse(req.body.filters);
  if (filters.framerate >= 0 && filters.framerate < 15) {
    const n = req.files.length * 2;
    filters.framerate = getFramerate(n);
    req.body.filters = JSON.stringify(filters);
  }
  next();
};

exports.getFramerate = getFramerate;
exports.setFramerate = setFramerate;
// exports.getFramerate = getFramerate;
