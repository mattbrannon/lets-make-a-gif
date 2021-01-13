const fs = require('fs');
const path = require('path');
const multer = require('multer');
const exec = require('child_process').exec;

const handleError = (error, res) => {
  const json = JSON.stringify({ error: true, message: error.message });
  res.status(500).contentType('application/json').end(json);
};

const handleSuccess = (data, res) => {
  const json = JSON.stringify({ success: true });
  res.status(201).contentType('application/json').end(json);
};

const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const imageFileFilter = (req, file, cb) => {
  const validExts = ['.jpeg', '.jpg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (validExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const videoFileFilter = (req, file, cb) => {
  const validExts = ['.mp4', '.mov', '.webm', '.mkv', '.m4v'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (validExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const videoLimits = {
  fieldNameSize: 100,
  fieldSize: 1024,
  fields: 1,
  fileSize: 2.5e8,
  files: 1,
  parts: 10,
  headerPairs: 100,
};

const imageLimits = {
  fieldNameSize: 100,
  fieldSize: 1024,
  fields: 1,
  fileSize: 2.5e8,
  files: 100,
  parts: 300,
  headerPairs: 100,
};

const videoUpload = multer({
  storage: videoStorage,
  fileFilter: videoFileFilter,
  limits: videoLimits,
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits: imageLimits,
});

const handleImageUpload = (req, res) => {
  const script = path.join(__dirname, 'scripts', 'convert_images.sh');
  const bash = exec(`bash ${script}`);

  bash.stdout.on('close', data => {
    res.status(201).send('success');
  });
};

const handleVideoUpload = (req, res) => {
  const file = req.file;
  const script = path.join(__dirname, 'scripts', 'convert_video.sh');
  const filePath = path.join(__dirname, '../', 'uploads', file.filename);

  let pathToGif;
  const bash = exec(`bash ${script} ${filePath}`);

  bash.stdout.on('data', data => {
    pathToGif = data;
  });

  bash.stdout.on('close', data => {
    fs.unlink(file.path, error => {
      if (error) {
        return handleError(error, res);
      }
      return handleSuccess(pathToGif, res);
    });
  });

  bash.stderr.on('data', data => {
    console.error(data);
  });
};

const handleGifDownload = (req, res) => {
  const promise = new Promise((resolve, reject) => {
    const file = path.join(__dirname, '../uploads', 'new-file.gif');
    resolve(file);
  });

  promise
    .then(file => {
      fs.createReadStream(file).pipe(res);
      return file;
    })
    .then(file => {
      fs.unlink(file, error => {
        if (error) {
          console.log('error unlinking file', file);
        }
      });
    })
    .catch(error => console.log(error));
};

module.exports = {
  handleImageUpload,
  handleVideoUpload,
  handleGifDownload,
  imageUpload,
  videoUpload,
};
