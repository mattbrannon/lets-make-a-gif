const fs = require('fs-extra');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffprobe = ffmpeg.ffprobe;
const { parseRequest, getPathToFolder, getGlobPattern } = require('./utils');
// const { makeCopies } = require('./resize');

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

const getDimensions = async (file) => {
  return new Promise((resolve, reject) => {
    ffprobe(file, (error, data) => {
      if (error) reject(error);
      const { width, height } = data.streams[0];
      resolve({ width, height });
    });
  });
};

const createGifFromImages = async ({ pathToInput, pathToOutput, framerate, filterString }) => {
  // const imageFolder = getPathToFolder('images', userId);
  // const outputFolder = getPathToFolder('output', userId);
  // const { globPattern } = getGlobPattern(imageFolder);

  // const first = fs.readdirSync(imageFolder)[0];
  // const size = await getDimensions(path.resolve(imageFolder, first));

  // const lavfi = filter.length
  //   ? filter + ',split [a][b]; [a] palettegen [P]; [b][P] paletteuse'
  //   : 'split [a][b]; [a] palettegen [P]; [b][P] paletteuse';

  //  split [a][b]; [a] palettegen=stats_mode=single [P]; [b][P] paletteuse=new=1" -f gif -pix_fmt pal8 output.gif

  const filter = filterString.length
    ? '[0:v] ' + filterString + ',split [a][b]; [a] palettegen [P]; [b][P] paletteuse'
    : '[0:v] split [a][b]; [a] palettegen [P]; [b][P] paletteuse';

  console.log('inside createGifsFromImages', { pathToInput, pathToOutput, framerate, filter });
  // if (filterString.length) {
  return ffmpeg(pathToInput)
    .inputOptions([ '-y', '-f image2', `-framerate ${framerate}`, '-pattern_type glob' ])
    .complexFilter(filter)
    .outputOptions([ '-f gif' ])
    .save(pathToOutput);
  // }
  // return ffmpeg(pathToInput)
  //   .inputOptions([ '-y', '-f image2', `-framerate ${framerate}`, '-pattern_type glob' ])
  //   .outputOptions([ '-f gif' ])
  //   .save(pathToOutput);
};

const handleImageStream = async (req, res, next) => {
  // const { framerate } = parseRequest(req);
  const userId = await res.locals.userId;
  const userData = await req.app.locals[userId];
  const { pathToInput, pathToOutput, filterString, framerate } = await userData;
  console.log('inside handle imageStream', userData);
  // const filterString = req.filter || '';
  // console.log({ framerate, filterString });
  // const config = { pathToInput, pathToOutput, framerate, filter };

  console.log({ pathToInput, pathToOutput, framerate, filterString });

  return await createGifFromImages({ pathToInput, pathToOutput, framerate, filterString })
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

const createGifFromVideo = async ({ pathToInput, pathToOutput, filter, fps }) => {
  // const videoFilter = args.join(',');
  const args = [ `fps=${Math.round(fps / 1.2)},scale=w=480:h=-1,split [a][b];[a] palettegen [p];[b][p] paletteuse` ];
  if (filter) {
    args.unshift(filter);
  }

  const videoFilter = args.join(',');

  return ffmpeg(pathToInput)
    .inputOptions([ '-y' ])
    .complexFilter(videoFilter)
    .outputOptions([ '-f gif' ])
    .save(pathToOutput);
};

const handleVideoStream = async (req, res, next) => {
  const { filter } = parseRequest(req);
  const userId = res.locals.userId;
  const userData = req.app.locals[userId];
  const { pathToInput, pathToOutput } = userData;
  console.log('inside handle videoStream', userData, req.filter);
  const fps = await getFps(pathToInput);

  return await createGifFromVideo({ pathToInput, pathToOutput, filter, fps })
    .then((command) => {
      command.on('end', () => {
        res.status(201).send({ framerate: fps });
      });
      command.on('error', (error) => {
        next(error);
      });
    })
    .catch((error) => {
      next(error);
    });
};

const createImage = async ({ filter, userId }) => {
  const output = path.join(__dirname, `../media/${userId}/output`);
  const inputFolder = path.join(__dirname, `../media/${userId}/images`);
  const inputFile = fs.readdirSync(inputFolder)[0];
  const input = `${inputFolder}/${inputFile}`;
  if (filter) {
    return ffmpeg(input)
      .inputOptions([ '-y' ])
      .videoFilter(filter)
      .save(`${output}/${inputFile}`);
  }
  return ffmpeg(input)
    .inputOptions([ '-y' ])
    .save(`${output}/${inputFile}`);
};

const handleSingleFile = (req, res, next) => {
  const filter = req.body.filterString;
  const userId = req.userId;
  return createImage({ filter, userId })
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
