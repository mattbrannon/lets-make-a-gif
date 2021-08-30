module.exports = (app) => {
  const router = require('express').Router();
  const { handleImageStream, handleVideoStream, handleSingleFile } = require('../../api');
  const { setInputOutput } = require('../middleware/filepath');
  // const multer = require('multer');
  // const upload = multer();

  router.post('/', setInputOutput, (req, res, next) => {
    const userId = res.locals.userId;
    const userData = req.app.locals[userId];
    userData.filterString = req.body.filterString;
    userData.framerate = req.body.filters.framerate;

    console.log('request body', { req: req.body });
    if (req.body.path === '/api/upload/videos') {
      handleVideoStream(req, res, next);
    }
    else if (req.body.path === '/api/upload/images') {
      handleImageStream(req, res, next);
    }
    else if (req.body.path === '/api/upload/image') {
      handleSingleFile(req, res, next);
    }
  });

  app.use('/api/upload/filters', router);
};
