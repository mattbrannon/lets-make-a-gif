module.exports = (app) => {
  const router = require('express').Router();
  const { imageUpload } = require('../config');
  const { handleStream } = require('../../api');

  router.post('/', imageUpload.array('file'), async (req, res, next) => {
    await handleStream(req, res, next);
  });

  app.use('/upload-images', router);
};
