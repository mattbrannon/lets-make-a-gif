const multer = require('multer');
const path = require('path');

const increment = (i = 0) => () => (++i).toString().padStart(4, 0);
const getNumber = increment();

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.userId;
    const filepath = path.join(__dirname, `../../media/${userId}/images`);
    cb(null, filepath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, file.fieldname + '-' + getNumber() + ext);
  },
});

const imageFileFilter = (req, file, cb) => {
  const validExts = [ '.jpeg', '.jpg', '.png', '.webp' ];
  const ext = path.extname(file.originalname).toLowerCase();
  if (validExts.includes(ext)) {
    cb(null, true);
  }
  else {
    cb(null, false);
  }
};

const imageLimits = {
  fieldNameSize: 100,
  fieldSize: 1024,
  fileSize: 2.5e8,
  files: 300,
  // parts: 2000,
  // headerPairs: 100,
};

const imageUpload = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits: imageLimits,
});

exports.imageUpload = imageUpload;

const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.userId;
    const filepath = path.join(__dirname, `../../media/${userId}/videos`);
    cb(null, filepath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const videoFileFilter = (req, file, cb) => {
  const validExts = [ '.mp4', '.mov', '.webm', '.mkv', '.m4v' ];
  const ext = path.extname(file.originalname).toLowerCase();
  if (validExts.includes(ext)) {
    cb(null, true);
  }
  else {
    cb(null, false);
  }
};

const videoLimits = {
  // fieldNameSize: 100,
  // fieldSize: 1024,
  // fields: 1,
  fileSize: 2.5e8,
  files: 1,
  parts: 10,
  headerPairs: 100,
};

const videoUpload = multer({
  storage: videoStorage,
  fileFilter: videoFileFilter,
  limits: videoLimits,
});

exports.videoUpload = videoUpload;