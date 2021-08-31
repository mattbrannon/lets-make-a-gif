module.exports = (app) => {
  const router = require('express').Router();
  const { handleImageStream, handleVideoStream, handleSingleFile } = require('../../api');
  const { setInputOutput } = require('../middleware/filepath');
  // const multer = require('multer');
  // const upload = multer();

  router.post('/', setInputOutput, (req, res, next) => {
    // userData.framerate = req.body.filters.framerate;

    // console.log('request body', { req: req.body });
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

  app.use('/api/upload/filters', router);
};
