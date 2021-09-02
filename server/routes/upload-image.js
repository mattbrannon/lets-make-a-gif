module.exports = (app) => {
  const router = require('express').Router();
  const { uploadImage, cleanUp, setInputOutput, handleImages } = require('../middleware');
  const { handleSingleFile } = require('../../api');

  router.post('/', cleanUp, handleImages, setInputOutput, async (req, res, next) => {
    await handleSingleFile(req, res, next);
  });

  app.use('/api/upload/image', router);
};
