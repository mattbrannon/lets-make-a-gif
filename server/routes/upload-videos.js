module.exports = (app) => {
  const router = require('express').Router();
  const { uploadVideo, resizeVideo, cleanUp, setInputOutput } = require('../middleware');
  const { handleVideoStream } = require('../../api');

  router.post('/', cleanUp, uploadVideo, setInputOutput, resizeVideo, (req, res, next) => {
    handleVideoStream(req, res, next);
  });

  app.use('/api/upload/videos', router);
};
