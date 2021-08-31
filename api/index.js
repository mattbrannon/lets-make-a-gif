// const fs = require('fs-extra');
// const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffprobe = ffmpeg.ffprobe;

const getFps = (file) => {
  return new Promise((resolve, reject) => {
    ffprobe(file, (error, data) => {
      if (error) reject(error);

      const n = data.streams
        .filter((obj) => obj.codec_type === 'video')
        .map((obj) => obj.r_frame_rate)[0]
        .split('/')
        .map(Number)
        .reduce((a, b) => Math.floor(Math.round(a / b) / 2));
      resolve(n);
    });
  });
};

// const getDimensions = async (file) => {
//   return new Promise((resolve, reject) => {
//     ffprobe(file, (error, data) => {
//       if (error) reject(error);
//       const { width, height } = data.streams[0];
//       resolve({ width, height });
//     });
//   });
// };

// const parsePath = (folderName, userId) => {
//   const folders = [ 'images', 'videos', 'original', 'output' ];
//   if (!folders.includes(folderName)) {
//     throw new Error('folder ' + folderName + ' not found');
//   }

//   const folder = path.resolve(path.join(__dirname, `../media/${userId}/${folderName}`));
//   const file = fs.readdirSync(folder)[0];
//   return path.parse(path.resolve(folder, file));
// };

const createGifFromImages = async ({ pathToInput, pathToOutput, filterString, framerate }) => {
  const filter = filterString.length
    ? '[0:v] ' + filterString + ',split [a][b]; [a] palettegen [P]; [b][P] paletteuse'
    : '[0:v] split [a][b]; [a] palettegen [P]; [b][P] paletteuse';

  // console.log('inside createGifsFromImages', { pathToInput, pathToOutput, framerate, filter });

  return ffmpeg(pathToInput)
    .inputOptions([ '-y', '-f image2', `-framerate ${framerate}`, '-pattern_type glob' ])
    .complexFilter(filter)
    .outputOptions([ '-f gif' ])
    .save(pathToOutput);
};

const createGifFromVideo = async ({ pathToInput, pathToOutput, filterString, framerate }) => {
  // const videoFilter = args.join(',');
  const args = [ `fps=${Math.round(framerate / 1.2)},split [a][b];[a] palettegen [p];[b][p] paletteuse` ];
  if (filterString) {
    args.unshift(filterString);
  }

  const videoFilter = args.join(',');

  return ffmpeg(pathToInput)
    .inputOptions([ '-y' ])
    .complexFilter(videoFilter)
    .outputOptions([ '-f gif' ])
    .save(pathToOutput);
};

const handleImageStream = async (req, res, next) => {
  const userId = await res.locals.userId;
  const userData = await res.locals[userId];
  const { pathToInput, pathToOutput, filterString, framerate } = await userData;
  return await createGifFromImages({ pathToInput, pathToOutput, filterString, framerate })
    .then((command) => {
      command.on('end', () => {
        res.status(201).send({ framerate });
      });
      command.on('error', (error) => {
        next(error);
      });
    })
    .catch((error) => {
      next(error);
    });
};

const handleVideoStream = async (req, res, next) => {
  const userId = await res.locals.userId;
  const userData = await res.locals[userId];
  const { pathToInput, pathToOutput, filterString } = await userData;
  const framerate = await getFps(pathToInput);

  return await createGifFromVideo({ pathToInput, pathToOutput, filterString, framerate })
    .then((command) => {
      command.on('end', () => {
        res.status(201).send({ framerate });
      });
      command.on('error', (error) => {
        next(error);
      });
    })
    .catch((error) => {
      next(error);
    });
};

const createImage = async ({ pathToInput, pathToOutput, filterString }) => {
  if (filterString) {
    return await ffmpeg(pathToInput)
      .inputOptions([ '-y' ])
      .videoFilter(filterString)
      .save(pathToOutput);
  }
  return await ffmpeg(pathToInput)
    .inputOptions([ '-y' ])
    .save(pathToOutput);
};

const handleSingleFile = async (req, res, next) => {
  const userId = res.locals.userId;
  const userData = res.locals[userId];

  const { pathToInput, pathToOutput, filterString } = userData;
  return await createImage({ pathToInput, pathToOutput, filterString })
    .then((command) => {
      command.on('end', () => {
        res.status(201).send('success');
      });
      command.on('error', (error) => {
        next(error);
      });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  createGifFromImages,
  createGifFromVideo,
  handleImageStream,
  handleSingleFile,
  handleVideoStream,
};
