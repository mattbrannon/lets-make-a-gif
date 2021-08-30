module.exports = (app) => {
  const router = require('express').Router();

  // const { ensureDirectories, cleanUp } = require('../middleware/filesystem');
  //req.baseUrl

  router.post('/', (req, res, next) => {
    res.status(201).send({ success: true, vars: req.app.locals });
  });

  app.use('/api/test', router);
};
