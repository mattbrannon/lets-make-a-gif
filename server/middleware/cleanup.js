const path = require('path');
const fs = require('fs-extra');

const removeOutput = (userId) => {
  const output = path.resolve(path.join(__dirname, `../../media/${userId}/output`));
  fs.emptyDirSync(output);
};

const removeVideos = (userId) => {
  const videos = path.resolve(path.join(__dirname, `../../media/${userId}/videos`));
  fs.emptyDirSync(videos);
};

const removeImages = (userId) => {
  const images = path.resolve(path.join(__dirname, `../../media/${userId}/images`));
  fs.emptyDirSync(images);
};

const cleanUp = (req, res, next) => {
  const userId = req.userId;
  removeOutput(userId);
  removeVideos(userId);
  removeImages(userId);
  next();
};

exports.removeOutput = removeOutput;
exports.removeImages = removeImages;
exports.removeVideos = removeVideos;
exports.cleanUp = cleanUp;
