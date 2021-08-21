const fs = require('fs-extra');
const path = require('path');
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

const createGifFromImages = async ({ framerate, filter, userId }) => {
  const ext = fs
    .readdirSync(path.join(__dirname, `../media/${userId}/images`))[0]
    .split('.')
    .slice(-1);

  const globPattern = path.join(__dirname, `../media/${userId}/images`, `*.${ext}`);
  const output = path.join(__dirname, `../media/${userId}/output`);

  const lavfi = filter.length
    ? filter + ',split [a][b]; [a] palettegen [P]; [b][P] paletteuse'
    : 'split [a][b]; [a] palettegen [P]; [b][P] paletteuse';

  return ffmpeg(globPattern)
    .inputOptions([ '-y', '-f image2', `-framerate ${framerate}`, '-pattern_type glob' ])
    .complexFilter(lavfi)
    .outputOptions([ '-f gif' ])
    .save(`${output}/images.gif`);
};

const createGifFromVideo = async ({ filter, userId }) => {
  const outputFolder = path.join(__dirname, `../media/${userId}/output`);
  const inputFolder = path.join(__dirname, `../media/${userId}/videos`);
  const inputFile = fs.readdirSync(inputFolder)[0];
  const input = path.resolve(inputFolder, inputFile);
  const filename = path.parse(input).name;
  const output = path.resolve(outputFolder, `${filename}.gif`);

  const fps = await getFps(input);

  const lavfi = filter.length ? filter + `,fps=${fps},scale=w=480:h=-1` : `fps=${fps},scale=w=480:h=-1`;

  return ffmpeg(input)
    .inputOptions([ '-y' ])
    .complexFilter(lavfi)
    .outputOptions([ '-f gif', '-pix_fmt bgr8' ])
    .save(output);
};

const handleImageStream = async (req, res, next) => {
  const userId = req.userId;

  const filters = typeof req.body.filters === 'string' ? JSON.parse(req.body.filters) : req.body.filters;
  const numberOfFiles = fs.readdirSync(path.join(__dirname, `../media/${userId}/images`)).length;

  const framerate = filters.framerate || numberOfFiles;
  const filter = req.body.filterString;

  return await createGifFromImages({ framerate, filter, userId })
    .then((command) => {
      command.on('end', () => {
        res.status(201).send('success');
      });
      command.on('error', (error) => {
        console.log('error', error);
        next(error);
      });
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
};

const handleVideoStream = async (req, res, next) => {
  const filter = req.body.filterString;
  const userId = req.userId;
  return await createGifFromVideo({ filter, userId })
    .then((command) => {
      command.on('end', () => {
        res.status(201).send('success');
      });
      command.on('error', (error) => {
        console.log('error', error);
        next(error);
      });
    })
    .catch((error) => {
      console.error(error);
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
        console.log('error', error);
        next(error);
      });
    })
    .catch((error) => {
      console.error(error);
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
