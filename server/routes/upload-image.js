module.exports = (app) => {
  const router = require('express').Router();
  const { uploadImages, cleanUp, setInputOutput } = require('../middleware');
  const { handleSingleFile } = require('../../api');

  router.post('/', cleanUp, uploadImages, setInputOutput, async (req, res, next) => {
    await handleSingleFile(req, res, next);
  });

  app.use('/api/upload/image', router);
};
