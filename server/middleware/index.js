const { cleanUp } = require('./cleanup');
const { videoUpload, imageUpload } = require('./multer');
const { resetFilter } = require('./reset');
const { resizeVideo, resizeImages } = require('./resize');
const { ensureDirectories } = require('./ensureDirs');
const { cookieSetter } = require('./cookies');
const { setInputOutput } = require('./inputOutput');

module.exports = {
  cleanUp,
  resetFilter,
  resizeVideo,
  resizeImages,
  cookieSetter,
  setInputOutput,
  videoUpload,
  imageUpload,

  ensureDirectories,
};
