module.exports = (app) => {
  const router = require('express').Router();
  const { videoUpload, resizeInitialUpload, cleanUp } = require('../middleware');
  const { handleVideoStream } = require('../../api');
  const { setInputOutput } = require('../middleware/filepath');

  router.post('/', cleanUp, videoUpload.single('file'), setInputOutput, resizeInitialUpload, (req, res, next) => {
    handleVideoStream(req, res, next);
  });

  app.use('/api/upload/videos', router);
};
