module.exports = (app) => {
  const router = require('express').Router();
  const { uploadImages, cleanUp, setInputOutput, resizeImages, handleVideos, handleImages } = require('../middleware');

  const { handleImageStream } = require('../../api');

  router.post('/', cleanUp, handleImages, setInputOutput, resizeImages, (req, res, next) => {
    handleImageStream(req, res, next);
  });

  app.use('/api/upload/images', router);
};
