const ffmpeg = require('fluent-ffmpeg');
const ffprobe = ffmpeg.ffprobe;
const fs = require('fs-extra');
const path = require('path');

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

const resizeImages = async (req, res, next) => {
  const userId = await res.locals.userId;
  const userData = await res.locals[userId];
  const { width, areEqual } = await areEqualSizes(userData.original);
  userData.usePalette = areEqual;
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

// const userFolder = path.resolve(path.join(__dirname, '../../media/1630532895985'));
// const imageFolder = path.resolve(userFolder, 'images');
// const originalFolder = path.resolve(userFolder, 'original');

// getPromises(originalFolder)
//   .then(async (promises) => {
//     const result = await Promise.all(promises);
//     const set = new Set([ ...result ]);
//     console.log(set);
//     return set.size === 1;
//   })
//   .then((bool) => console.log(bool))
//   .catch(console.error);

// Promise.all(promises)
//   .then((result) => console.log(result))
//   .catch(console.error);

// .catch((error) => console.error({ error }));

exports.resizeVideo = resizeVideo;
exports.resizeImages = resizeImages;
