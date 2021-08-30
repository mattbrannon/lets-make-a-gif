const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs-extra');
const path = require('path');

const resizeInitialUpload = (req, res, next) => {
  const userId = res.locals.userId;
  const userData = req.app.locals[userId];
  // const pathToOriginal = userData.pathToOriginal;
  const nameOfFile = fs.readdirSync(userData.original)[0];

  const pathToOriginal = path.resolve(userData.original, nameOfFile);
  // fs.readdirSync(userData.original)[0]
  const pathToVideos = path.resolve(userData.videos, nameOfFile);

  console.log({ userData });

  const command = ffmpeg(pathToOriginal)
    .inputOptions([ '-y' ])
    .complexFilter('scale=w=480:h=-1')
    .outputOptions([ '-an' ])
    .save(pathToVideos);

  command.on('end', () => {
    next();
  });
  command.on('error', (error) => {
    next(error);
  });
};

exports.resizeInitialUpload = resizeInitialUpload;
