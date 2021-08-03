const path = require('path');
const fs = require('fs-extra');
const { cleanUp } = require('../middleware/cleanUp');

const sendFileToClient = (req, res, next) => {
  const filepath = path.join(__dirname, '../../media/downloads');
  const filename = fs.readdirSync(filepath)[0];
  const file = path.join(filepath, filename);
  fs.createReadStream(file).pipe(res);
  next();
};

// const cleanUp = () => {
//   const downloads = path.join(__dirname, '../../media/downloads');
//   const videos = path.join(__dirname, '../../media/uploads/videos');
//   const images = path.join(__dirname, '../../media/uploads/images');
//   fs.emptyDirSync(images);
//   fs.emptyDirSync(videos);
//   fs.emptyDirSync(downloads);
// };


module.exports = (app) => {
  const router = require('express').Router();

  router.get('/', sendFileToClient, cleanUp);

  app.use('/download', router);
};

