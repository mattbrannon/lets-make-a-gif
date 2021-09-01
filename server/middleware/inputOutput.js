const path = require('path');
const fs = require('fs-extra');

const setInputOutput = async (req, res, next) => {
  const userId = await res.locals.userId;
  const userData = await res.locals[userId];
  const route = req.body.route;

  if (req.baseUrl === '/api/upload/images' || route === '/api/upload/images') {
    // handle images
    const pathToOutput = path.resolve(userData.output, `${req.body.filename}.gif`);
    const pathToImages = path.resolve(userData.images, `*${req.body.ext}`);
    userData.pathToInput = pathToImages;
    userData.pathToOutput = pathToOutput;
    userData.framerate = req.body.framerate;
    userData.route = req.body.route;
    userData.filterString = req.body.filterString;
    userData.ext = req.body.ext;
    userData.filename = req.body.filename;
  }
  else if (req.baseUrl === '/api/upload/image' || route === '/api/upload/image') {
    // handle single image
    const originalFilename = req.body.filename + req.body.ext;
    const file = await fs.readdir(userData.images).then((files) => files[0]);
    const pathToInput = path.resolve(userData.images, file);
    const pathToOutput = path.resolve(userData.output, originalFilename);
    userData.pathToInput = pathToInput;
    userData.pathToOutput = pathToOutput;
    userData.framerate = req.body.framerate;
    userData.route = req.body.route;
    userData.filterString = req.body.filterString;
    userData.ext = req.body.ext;
    userData.filename = req.body.filename;
  }
  else if (req.baseUrl === '/api/upload/videos' || route === '/api/upload/videos') {
    // handle video
    // const file = req.body.filename + req.body.ext;
    const file = fs.readdirSync(userData.original)[0];
    const pathToOriginal = path.resolve(userData.original, file);
    const pathToInput = path.resolve(userData.videos, file);
    const pathToOutput = path.resolve(userData.output, `${req.body.filename}.gif`);
    userData.pathToInput = pathToInput;
    userData.pathToOutput = pathToOutput;
    userData.pathToOriginal = pathToOriginal;
    userData.filterString = req.body.filterString;
  }
  next();
};

module.exports = { setInputOutput };
