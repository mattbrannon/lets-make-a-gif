module.exports = (app) => {
  const router = require('express').Router();
  const path = require('path');
  const fs = require('fs-extra');

  router.get('/', (req, res) => {
    try {
      const userId = req.headers.cookie.split('=')[1];
      const userData = res.locals[userId];

      const file = fs.readdirSync(userData.output)[0];
      const filepath = path.resolve(userData.output, file);

      fs.createReadStream(filepath).pipe(res);
    } catch (error) {
      res.send(error);
    }
  });

  app.use('/api/download', router);
};
