
module.exports = (app) => {
  const router = require('express').Router();
  const { imageUpload } = require('../config');
  const { handleImageStream } = require('../../api');
  const { cleanUp } = require('../middleware/cleanUp')
  
  router.post('/', imageUpload.array('file'), async (req, res, next) => {
    // console.log(req.body)
    await handleImageStream(req, res, next);
  });

  app.use('/upload-images', router);
};
