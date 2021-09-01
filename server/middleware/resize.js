const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs-extra');
const path = require('path');

const resizeVideo = (req, res, next) => {
  const userId = res.locals.userId;
  const userData = res.locals[userId];

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

const resizeImages = async (req, res, next) => {
  const userId = await res.locals.userId;
  const userData = await res.locals[userId];
  const files = await fs.readdir(userData.original);
  for (const file of files) {
    const filepath = path.resolve(userData.original, file);
    const outputPath = path.resolve(userData.images, file);
    ffmpeg(filepath)
      .outputOptions('-vf scale=480:-1')
      .save(outputPath);
  }
  next();
};

exports.resizeVideo = resizeVideo;
exports.resizeImages = resizeImages;
