module.exports = (app) => {
  const router = require('express').Router();
  const { imageUpload, cleanUp } = require('../middleware');
  const { setInputOutput } = require('../middleware/filepath');

  const { handleSingleFile } = require('../../api');

  router.post('/', cleanUp, imageUpload.single('file'), setInputOutput, async (req, res, next) => {
    await handleSingleFile(req, res, next);
  });

  app.use('/api/upload/image', router);
};
