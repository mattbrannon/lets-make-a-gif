const { cleanUp } = require('./cleanup');
const { getFramerate, setFramerate } = require('./framerate');
const { videoUpload, imageUpload } = require('./multer');
const { resetFilter } = require('./reset');
const { resizeInitialUpload } = require('./resize');
const { ensureDirectories, localVariables } = require('./filesystem');

module.exports = {
  cleanUp,
  getFramerate,
  setFramerate,
  resetFilter,
  resizeInitialUpload,
  videoUpload,
  imageUpload,

  ensureDirectories,
  localVariables,
};
