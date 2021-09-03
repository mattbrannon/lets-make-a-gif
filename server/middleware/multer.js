const multer = require('multer');
const path = require('path');

const increment = (i = 0) => () => (++i).toString().padStart(4, 0);
const getNumber = increment();

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.userId;
    const filepath = path.join(__dirname, `../../media/${userId}/original`);
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
  // fileSize: 4.5e6,
  // files: 301,
};

const imageUpload = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits: imageLimits,
});

const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.userId;
    const filepath = path.join(__dirname, `../../media/${userId}/original`);
    cb(null, filepath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const videoFileFilter = (req, file, cb) => {
  const validExts = [ '.mp4', '.mov', '.webm', '.mkv', '.m4v', '.avi' ];
  const ext = path.extname(file.originalname).toLowerCase();
  if (validExts.includes(ext)) {
    cb(null, true);
  }
  else {
    cb(null, false);
  }
};

const videoLimits = {
  fileSize: 1.5e7,
  files: 1,
  // parts: 10,
  // headerPairs: 100,
};

const videoUpload = multer({
  storage: videoStorage,
  fileFilter: videoFileFilter,
  limits: videoLimits,
});

const handleImages = imageUpload.array('file');
const handleVideos = videoUpload.single('file');
const handleImage = imageUpload.single('file');

const uploadImages = (req, res, next) => {
  handleImages(req, res, function (error) {
    if (error instanceof multer.MulterError) {
      console.log({ multer: error.code });
      const json = JSON.stringify({ message: error.message });
      res.status(500).send(json);
    }
    else if (error) {
      console.log({ error });
    }
    else {
      // console.log({ success: true });
      next();
    }
  });
};

const uploadVideo = (req, res, next) => {
  handleVideos(req, res, function (error) {
    if (error) {
      console.log({ file: __filename, error: error.message });
      next(error);
    }
    next();
  });
};

const uploadImage = (req, res, next) => {
  handleImage(res, res, (error) => {
    if (error) {
      console.log({ file: __filename, error: error.message });
      next(error);
    }
    next();
  });
};

module.exports = {
  uploadImage,
  uploadImages,
  uploadVideo,
};
