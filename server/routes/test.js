module.exports = (app) => {
  const router = require('express').Router();
  const multer = require('multer');
  const upload = multer();
  // const { ensureDirectories, cleanUp } = require('../middleware/filesystem');
  //req.baseUrl

  router.post('/', upload.none(), (req, res, next) => {
    console.log(req.body);
    const userId = res.locals.userId;
    const userData = req.app.locals[userId];
    const { filterString, framerate, filename, ext, route } = req.body;

    userData.filterString = filterString;
    userData.framerate = framerate;
    userData.filename = filename;
    userData.ext = ext;
    userData.route = route;

    res.status(201).send({ success: true, userData });
  });

  app.use('/api/test', router);
};
