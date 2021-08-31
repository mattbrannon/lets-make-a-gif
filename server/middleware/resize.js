const ffmpeg = require('fluent-ffmpeg');
// const fs = require('fs-extra');
// const path = require('path');

const resizeInitialUpload = (req, res, next) => {
  const userId = res.locals.userId;
  const userData = res.locals[userId];

  console.log({ userData });

  const command = ffmpeg(userData.pathToOriginal)
    .inputOptions([ '-y' ])
    .complexFilter('scale=w=480:h=-1')
    .outputOptions([ '-an' ])
    .save(userData.pathToInput);

  command.on('end', () => {
    next();
  });
  command.on('error', (error) => {
    next(error);
  });
};

exports.resizeInitialUpload = resizeInitialUpload;
