module.exports = (app) => {
  const router = require('express').Router();
  const { videoUpload, resizeVideo, cleanUp, setInputOutput } = require('../middleware');
  const { handleVideoStream } = require('../../api');

  router.post('/', cleanUp, videoUpload.single('file'), setInputOutput, resizeVideo, (req, res, next) => {
    handleVideoStream(req, res, next);
  });

  app.use('/api/upload/videos', router);
};
