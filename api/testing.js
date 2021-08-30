const path = require('path');
const fs = require('fs-extra');
const ffmpeg = require('fluent-ffmpeg');
const ffprobe = ffmpeg.ffprobe;

const getDimensions = async (file) => {
  return new Promise((resolve, reject) => {
    ffprobe(file, (error, data) => {
      if (error) reject(error);
      const { width } = data.streams[0];
      resolve({ width });
    });
  });
};

const getAllDimensions = async (folder) => {
  const files = fs.readdirSync(folder);
  let arr = [];
  for await (const file of files) {
    const fullPath = path.resolve(folder, file);
    arr = [ ...arr, await getDimensions(fullPath) ];
  }
  return arr;
};

const areSameSize = (arr) => {
  const set = new Set();
  for (const obj of arr) {
    set.add(JSON.stringify(obj));
  }
  return set.size === 1;
};

const resize = (folder) => {
  fs.readdirSync(folder).forEach((filename) => {
    const file = path.resolve(folder, filename);
    ffmpeg(file)
      .videoFilter('scale=360:-2')
      .saveToFile(file);
  });
};

const checkFileDimensions = async (folder) => {
  const sizes = await getAllDimensions(folder);
  const areEqual = areSameSize(sizes);
  if (!areEqual) {
    resize(folder);
  }
  return await folder;
};

// const folder = path.join(__dirname, '../../media/1629885297206/images');
// const folder = path.resolve(path.join(__dirname, '../media/1629885297206/copies'));
// getAllDimensions(folder).then((arr) => {
//   if (areSameSize(arr)) {
//     // all good
//   }
//   else {
//     // need to resize
//     resize(folder);
//   }
// });
