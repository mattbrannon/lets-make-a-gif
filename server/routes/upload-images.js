module.exports = (app) => {
  const router = require('express').Router();
  const { imageUpload, setFramerate, cleanUp } = require('../middleware');
  const { setInputOutput } = require('../middleware/filepath');

  const { handleImageStream } = require('../../api');

  router.post('/', cleanUp, imageUpload.array('file'), setInputOutput, setFramerate, (req, res, next) => {
    handleImageStream(req, res, next);
  });

  app.use('/api/upload/images', router);
};
