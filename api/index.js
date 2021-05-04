const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const handleImages = async (input, output) => {
  return ffmpeg(input)
    .fps(12)
    .inputOptions(['-y', '-f image2', '-pattern_type glob'])
    .save(output);
};

const handleVideo = async (input, output) => {
  return ffmpeg(input)
    .inputOptions(['-y'])
    .complexFilter(['[0:v] fps=12,scale=w=480:h=-1'])
    .save(output);
};

const handleVideoStream = async (req, res, next) => {
  const input = req.file.path;
  const output = path.join(__dirname, '../media/downloads', `${Date.now()}.gif`);

  return await handleVideo(input, output)
    .then((command) => {
      command.on('end', (data) => {
        res.status(201).send('success');
      });
      command.on('error', (error) => {
        console.log(error);
        next(error);
      });
    })
    .catch((error) => {
      next(error);
    });
};

const handleStream = async (req, res, next) => {
  const destination = req.files[0].destination;
  const ext = req.files[0].filename.split('.')[1];
  const input = path.join(destination, `*.${ext}`);
  const output = path.join(__dirname, '../media/downloads', `${Date.now()}.gif`);

  return await handleImages(input, output)
    .then((command) => {
      command.on('end', (data) => {
        res.status(201).send('sucess');
      });
      command.on('error', (error) => {
        console.log(error);
        next(error);
      });
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
};

module.exports = {
  handleStream,
  handleVideoStream,
};
