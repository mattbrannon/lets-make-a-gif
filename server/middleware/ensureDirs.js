const path = require('path');
const fs = require('fs-extra');

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

exports.ensureDirectories = ensureDirectories;
