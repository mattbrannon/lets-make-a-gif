module.exports = (app) => {
  const router = require('express').Router();
  const { cleanUp, imageUpload, setFramerate, handleCookies } = require('../middleware');
  const { handleImageStream } = require('../../api');

  router.post('/', handleCookies, cleanUp, imageUpload.array('file'), setFramerate, (req, res, next) => {
    handleImageStream(req, res, next);
  });

  app.use('/api/upload/images', router);
};
