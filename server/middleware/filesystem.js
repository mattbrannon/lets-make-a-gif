const path = require('path');
const fs = require('fs-extra');
// const multer = require('multer');
// const upload = multer();

const ensureDirectories = async (req, res, next) => {
  const userId = res.locals.userId;
  res.locals[userId] = {};
  const mediaFolder = path.join(__dirname, '../../media');
  const userFolder = path.resolve(mediaFolder, userId);
  await Promise.all([ 'videos', 'images', 'original', 'output' ])
    .then((dirs) => {
      dirs.forEach((dir) => {
        const pathToDir = path.resolve(userFolder, dir);
        fs.ensureDir(pathToDir);
        res.locals[userId][dir] = pathToDir;
      });
    })
    .catch((error) => next(error));
  next();
};

const localVariables = (req, res, next) => {
  const userId = res.locals.userId;
  res.app.locals[userId] = {
    videos: res.locals[userId].videos,
    images: res.locals[userId].images,
    original: res.locals[userId].original,
    output: res.locals[userId].output,
  };
  req.userData = res.app.locals[userId];
  next();
};

module.exports = {
  ensureDirectories,
  localVariables,
};
