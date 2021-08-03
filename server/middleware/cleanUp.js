const path = require('path');
const fs = require('fs-extra');

const cleanUp = () => {
  const downloads = path.join(__dirname, '../../media/downloads');
  const videos = path.join(__dirname, '../../media/uploads/videos');
  const images = path.join(__dirname, '../../media/uploads/images');
  fs.emptyDirSync(images);
  fs.emptyDirSync(videos);
  fs.emptyDirSync(downloads);
};

module.exports =  { cleanUp }