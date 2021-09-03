module.exports = (app) => {
  const router = require('express').Router();
  const { cleanUp, setInputOutput, uploadImages } = require('../middleware');
  const resizeImages = require('../middleware/resizeImages')(app);
  const { handleImageStream } = require('../../api');

  router.post('/', cleanUp, uploadImages, setInputOutput, resizeImages, async (req, res, next) => {
    await handleImageStream(req, res, next);
  });

  app.use('/api/upload/images', router);
};
