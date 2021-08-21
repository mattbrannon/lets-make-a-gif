module.exports = (app) => {
  const router = require('express').Router();
  const { handleImageStream, handleVideoStream, handleSingleFile } = require('../../api');
  const { handleCookies } = require('../middleware');
  router.post('/', handleCookies, (req, res, next) => {
    if (req.body.path === '/api/upload/videos') {
      handleVideoStream(req, res, next);
    }
    else if (req.body.path === '/api/upload/image') {
      handleSingleFile(req, res, next);
    }
    else {
      handleImageStream(req, res, next);
    }
  });

  app.use('/api/upload/filters', router);
};
