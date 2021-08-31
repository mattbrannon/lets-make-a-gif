module.exports = (app) => {
  const router = require('express').Router();
  const path = require('path');
  const fs = require('fs-extra');

  router.get('/', (req, res) => {
    try {
      const userId = req.headers.cookie.split('=')[1];
      const userData = res.locals[userId];
      console.log(userData);
      const folder = path.join(__dirname, `../../media/${userId}/output`);
      const file = fs.readdirSync(folder)[0];

      const ext = file.split('.').slice(-1);
      const filename = file.split('.').slice(0, -1);

      const filepath = `${folder}/${filename}.${ext}`;
      fs.createReadStream(filepath).pipe(res);
    } catch (error) {
      res.send(error.message);
    }
  });

  app.use('/api/download', router);
};
