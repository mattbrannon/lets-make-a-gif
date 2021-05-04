const multer = require('multer');
const path = require('path');

const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filepath = path.join(__dirname, '../../media/uploads/videos');
    cb(null, filepath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

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

const videoUpload = multer({
  storage: videoStorage,
  fileFilter: videoFileFilter,
  limits: videoLimits,
});

exports.videoUpload = videoUpload;
