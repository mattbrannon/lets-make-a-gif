const { cleanUp } = require('./cleanup');
const { uploadVideo, uploadImage, uploadImages } = require('./multer');
const { resetFilter } = require('./reset');
const { resizeVideo } = require('./resize');
const { ensureDirectories } = require('./ensureDirs');
const { cookieSetter } = require('./cookies');
const { setInputOutput } = require('./inputOutput');
const resizeImages = require('./resizeImages');

module.exports = {
  cleanUp,
  resetFilter,
  resizeVideo,
  resizeImages,
  cookieSetter,
  setInputOutput,
  uploadVideo,
  uploadImage,
  uploadImages,
  ensureDirectories,
};
