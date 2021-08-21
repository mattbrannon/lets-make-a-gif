const { cleanUp, removeImages, removeVideos, removeOutput } = require('./cleanup');
const { getFramerate, setFramerate } = require('./framerate');
const { videoUpload, imageUpload } = require('./multer');
const { handleCookies } = require('./cookies');

module.exports = {
  cleanUp,
  removeImages,
  removeVideos,
  removeOutput,
  getFramerate,
  setFramerate,
  handleCookies,
  videoUpload,
  imageUpload,
};
