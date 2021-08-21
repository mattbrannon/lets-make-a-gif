module.exports = (app) => {
  const router = require('express').Router();
  const { cleanUp, videoUpload, handleCookies } = require('../middleware');
  const { handleVideoStream } = require('../../api');

  router.post('/', handleCookies, cleanUp, videoUpload.single('file'), (req, res, next) => {
    handleVideoStream(req, res, next);
  });

  app.use('/api/upload/videos', router);
};
