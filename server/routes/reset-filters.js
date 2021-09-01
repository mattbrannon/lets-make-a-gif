module.exports = (app) => {
  const router = require('express').Router();
  const { handleImageStream, handleVideoStream, handleSingleFile } = require('../../api');
  const { resetFilter, setInputOutput } = require('../middleware');

  router.post('/', resetFilter, setInputOutput, (req, res, next) => {
    if (req.body.route === '/api/upload/videos') {
      handleVideoStream(req, res, next);
    }
    else if (req.body.route === '/api/upload/images') {
      handleImageStream(req, res, next);
    }
    else if (req.body.route === '/api/upload/image') {
      handleSingleFile(req, res, next);
    }
  });

  app.use('/api/upload/reset', router);
};
