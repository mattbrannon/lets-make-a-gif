module.exports = (app) => {
  const path = require('path');
  const router = require('express').Router();

  router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build/index.html'));
  });

  app.use('*', router);
};
