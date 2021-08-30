const fs = require('fs-extra');
const cleanUp = (req, res, next) => {
  const userId = res.locals.userId;
  const files = res.locals[userId];
  for (const key in files) {
    fs.emptyDir(files[key]);
  }
  next();
};

module.exports = { cleanUp };
