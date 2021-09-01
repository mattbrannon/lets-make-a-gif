const fs = require('fs-extra');
const cleanUp = async (req, res, next) => {
  const userId = res.locals.userId;
  const files = res.locals[userId];
  for (const key in files) {
    await fs.emptyDir(files[key]);
  }
  next();
};

module.exports = { cleanUp };
