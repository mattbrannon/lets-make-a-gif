const path = require('path');
const PORT = process.env.PORT || 5000;

const express = require('express');
const cors = require('cors');

const app = express();

const {
  handleVideoUpload,
  handleImageUpload,
  handleGifDownload,
  imageUpload,
  videoUpload,
} = require('./api');

app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));

/// POST REQUEST

app.post(
  '/upload-images',
  imageUpload.array('file'),
  handleImageUpload
);
app.post(
  '/upload-video',
  videoUpload.single('file'),
  handleVideoUpload
);

/// GET REQUEST
app.get('/download', handleGifDownload);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
