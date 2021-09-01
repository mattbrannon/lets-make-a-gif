module.exports = (app) => {
  const router = require('express').Router();
  const { imageUpload, cleanUp, setInputOutput, resizeImages } = require('../middleware');

  const { handleImageStream } = require('../../api');

  router.post('/', cleanUp, imageUpload.array('file'), setInputOutput, resizeImages, (req, res, next) => {
    handleImageStream(req, res, next);
  });

  app.use('/api/upload/images', router);
};
