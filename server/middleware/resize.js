const ffmpeg = require('fluent-ffmpeg');

const resizeVideo = (req, res, next) => {
  const userId = res.locals.userId;
  const userData = res.locals[userId];

  const command = ffmpeg(userData.pathToOriginal)
    .inputOptions([ '-y' ])
    .complexFilter('scale=w=480:h=-2')
    .outputOptions([ '-an' ])
    .save(userData.pathToInput);

  command.on('end', () => {
    next();
  });
  command.on('error', (error) => {
    next(error);
  });
};

exports.resizeVideo = resizeVideo;
