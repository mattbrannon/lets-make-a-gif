module.exports = (app) => {
  const router = require('express').Router();
  const { cleanUp, imageUpload, handleCookies } = require('../middleware');
  const { handleSingleFile } = require('../../api');

  router.post('/', handleCookies, cleanUp, imageUpload.single('file'), (req, res, next) => {
    handleSingleFile(req, res, next);
  });

  app.use('/api/upload/image', router);
};
