module.exports = (app) => {
  const path = require('path');
  const router = require('express').Router();
  const fs = require('fs-extra');

  router.get('/', async (req, res, next) => {
    const folder = path.resolve(path.join(__dirname, '../../src/videos'));
    const files = await fs.readdir(folder);
    Promise.all(files)
      .then((array) => {
        return array.map((file) => {
          const filepath = path.resolve(folder, file);
          return filepath;
        });
      })
      .then((fullpaths) => {
        res.send(fullpaths);
      })
      .catch(next);
  });

  app.use('/api/404', router);
};
