const fs = require('fs-extra');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

const createGifFromImages = async ({ pathToInput, pathToOutput, filterString, framerate, usePalette }) => {
  // console.log({ usePalette });
  const args = [ 'split [a][b]; [a] palettegen [p]; [b][p] paletteuse' ];
  if (!usePalette) args.pop();
  if (filterString) {
    args.unshift(filterString);
  }
  const filter = args.join(',');
  // const filter = filterString.length
  //   ? '[0:v] ' + filterString + ',split [a][b]; [a] palettegen [P]; [b][P] paletteuse'
  //   : '[0:v] split [a][b]; [a] palettegen [P]; [b][P] paletteuse';

  if (filter) {
    return ffmpeg(pathToInput)
      .inputOptions([ '-y', '-f image2', `-framerate ${framerate}`, '-pattern_type glob' ])
      .complexFilter(filter)
      .outputOptions([ '-f gif' ])
      .save(pathToOutput);
  }
  return ffmpeg(pathToInput)
    .inputOptions([ '-y', '-f image2', `-framerate ${framerate}`, '-pattern_type glob' ])
    .outputOptions([ '-f gif' ])
    .save(pathToOutput);
};

const createGifFromVideo = async ({ pathToInput, pathToOutput, filterString, framerate }) => {
  const args = [ `split [a][b];[a] palettegen [p];[b][p] paletteuse` ];
  if (filterString) {
    args.unshift(filterString);
  }

  const videoFilter = args.join(',');

  return ffmpeg(pathToInput)
    .inputOptions([ '-y' ])
    .inputFPS(framerate)
    .complexFilter(videoFilter)
    .outputOptions([ '-f gif' ])
    .save(pathToOutput);
};

const handleImageStream = async (req, res, next) => {
  // console.log(__filename, req.app.locals);
  const userId = await res.locals.userId;
  const userData = await res.locals[userId];
  const { usePalette } = await req.app.locals;
  const { pathToOutput, filterString, framerate } = await userData;
  const original = path.resolve(path.join(__dirname, `../media/${userId}/original`));
  const images = path.resolve(path.join(__dirname, `../media/${userId}/images`));

  const l1 = fs.readdirSync(original).length;
  const l2 = fs.readdirSync(images).length;
  let pathToInput;
  if (l1 === l2) {
    pathToInput = userData.pathToInput;
  }
  else {
    pathToInput = path.resolve(original, `*${userData.ext}`);
  }

  return await createGifFromImages({ pathToInput, pathToOutput, filterString, framerate, usePalette })
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
  const { pathToInput, pathToOutput, filterString, framerate } = await userData;

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
