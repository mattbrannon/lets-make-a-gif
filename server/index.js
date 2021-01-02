const fs = require('fs');

const path = require('path');

const multer = require('multer');
const express = require('express');
const cors = require('cors');
const exec = require('child_process').exec;

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const handleError = (error, res) => {
  const json = JSON.stringify({ error: true, message: error.message });
  res.status(500).contentType('application/json').end(json);
};

const handleSuccess = (data, res) => {
  const json = JSON.stringify({ success: true });
  res.status(201).contentType('application/json').end(json);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const validExts = ['.mp4', '.mov', '.webm', '.gif', '.mkv', '.m4v'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (validExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  fieldNameSize: 100,
  fieldSize: 1024,
  fields: 1,
  fileSize: 2.5e8,
  files: 1,
  parts: 10,
  headerPairs: 100,
};

const upload = multer({
  storage,
  fileFilter,
  limits,
});

app.post('/upload-video', upload.single('file'), (req, res) => {
  const file = req.file;
  const script = path.join(__dirname, 'scripts', 'make_gif.sh');
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
});

app.get('/download', (req, res) => {
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
});
