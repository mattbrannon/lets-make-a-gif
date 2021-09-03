const path = require('path');
const fs = require('fs-extra');
const ffmpeg = require('fluent-ffmpeg');
const ffprobe = ffmpeg.ffprobe;

const getPromises = async (folder) => {
  const promises = await fs.readdir(folder).then((files) => {
    return files.map((file) => {
      const fullpath = path.resolve(folder, file);
      return new Promise((resolve, reject) => {
        ffprobe(fullpath, (error, data) => {
          if (error) reject(error);
          const { width, height } = data.streams[0];
          resolve(JSON.stringify({ width, height }));
        });
      });
    });
  });
  return promises;
};
const areEqualSizes = async (folder) => {
  const promises = await getPromises(folder);
  const result = await Promise.all(promises);
  const { width, height } = JSON.parse(result[0]);
  const set = new Set([ ...result ]);
  return { width, height, areEqual: set.size === 1 };
  // return set.size === 1;
};

module.exports = (app) => {
  // const appData = app.locals;
  return async function resizeImages(req, res, next) {
    const userId = await res.locals.userId;
    const userData = await res.locals[userId];
    const { width, areEqual } = await areEqualSizes(userData.original);
    app.locals.usePalette = areEqual;
    userData.usePalette = app.locals.usePalette;
    // console.log({ file: __filename, appData });
    if (!areEqual || width > 480) {
      const files = await fs.readdir(userData.original);
      for (const file of files) {
        const filepath = path.resolve(userData.original, file);
        const outputPath = path.resolve(userData.images, file);
        ffmpeg(filepath)
          // .size('480x270')
          .outputOptions('-vf scale=480:-2')
          .save(outputPath);
      }
      next();
    }
    else {
      next();
    }
  };
};
