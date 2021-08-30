const path = require('path');
const fs = require('fs-extra');

const setInputOutput = (req, res, next) => {
  const userId = res.locals.userId;
  const userData = req.app.locals[userId];
  const kind = req.body.kind;
  const route = req.body.path;
  const filterString = req.body.filterString;
  const framerate = req.body.framerate;
  userData.framerate = framerate;
  console.log(req.baseUrl);

  // console.log({ userData });
  const { original, videos, images, output } = userData;

  if (route === '/api/upload/videos' || kind === 'video') {
    console.log('ITS A VIDEO');

    const nameOfFile = fs.readdirSync(original)[0];
    const pathToOriginal = path.resolve(original, nameOfFile);
    const pathToVideos = path.resolve(videos, nameOfFile);

    const nameWithoutExt = path.parse(pathToOriginal).name;
    const pathToOutput = path.resolve(output, nameWithoutExt + '.gif');

    userData.pathToOriginal = pathToOriginal;
    userData.pathToOutput = pathToOutput;
    userData.pathToInput = pathToVideos;
    userData.filename = nameOfFile;
    userData.outputFile = nameWithoutExt + '.gif';
  }
  else if (route === '/api/upload/image' || kind === 'image') {
    const filename = fs.readdirSync(images)[0];
    const nameWithoutExt = path.parse(path.resolve(images, filename)).name;
    const ext = path.extname(path.resolve(images, filename));
    const pathToImages = path.resolve(images, `*${ext}`);
    userData.filename = filename;
    userData.pathToInput = path.resolve(images, filename);
    userData.pathToOutput = path.resolve(output, filename);
  }
  else if (route === '/api/upload/images' || kind === 'image') {
    console.log('ITS MULTIPLE IMAGES');
    const filename = fs.readdirSync(images)[0];
    const nameWithoutExt = path.parse(path.resolve(images, filename)).name;
    const ext = path.extname(path.resolve(images, filename));
    const pathToImages = path.resolve(images, `*${ext}`);
    userData.filename = nameWithoutExt; //path.parse(path.resolve(pathToImages)).name;
    userData.ext = ext;
    userData.pathToInput = pathToImages;
    userData.outputFile = `${nameWithoutExt}.gif`;
    const pathToOutput = path.resolve(output, userData.outputFile);
    userData.pathToOutput = pathToOutput;

    const framerate = fs.readdirSync(images).length;
    userData.framerate = framerate;
  }

  userData.baseUrl = req.baseUrl;
  userData.filterString = filterString;
  console.log('inside setInputOutput', { userData });

  next();
};

module.exports = { setInputOutput };
