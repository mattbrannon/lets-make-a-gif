const path = require('path');
const fs = require('fs-extra');
const ffmpeg = require('fluent-ffmpeg');
const ffprobe = ffmpeg.ffprobe;

const getDimensions = async (file) => {
  return new Promise((resolve, reject) => {
    ffprobe(file, (error, data) => {
      if (error) reject(error);
      const { width, height } = data.streams[0];
      resolve({ width, height });
    });
  });
};

exports.getDimensions = getDimensions;

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

const resize = async (input, output) => {
  // const outFolder = path.resolve(path.join(folder, '../copies'));
  fs.readdirSync(input).forEach((filename) => {
    const inputFile = path.resolve(input, filename);
    const outputFile = path.resolve(output, filename);
    // const output = path.resolve(path.join(dirname, '../copies', filename));
    ffmpeg(inputFile)
      .inputOptions([ '-y' ])
      .videoFilter('scale=240:240:eval=frame')
      // .outputOptions([])
      .saveToFile(outputFile);
  });
};

// const folder = path.join(__dirname, '../media/1629912548930/images');

const makeCopies = async (folder) => {
  const sizes = await getAllDimensions(folder);
  const areEqual = areSameSize(sizes);
  if (!areEqual) {
    const copyPath = path.resolve(path.join(path.dirname(folder), 'copies'));
    fs.emptyDirSync(copyPath);
    await resize(folder, copyPath);
    return true;
  }
  return false;
};

exports.makeCopies = makeCopies;

// makeCopies(folder);

// const checkFileDimensions = async (folder) => {
//   const sizes = await getAllDimensions(folder);
//   const areEqual = areSameSize(sizes);
//   if (!areEqual) {
//     return resize(folder)
//       .then((command) => {
//       })
//       .catch((error) => {
//         //
//       });
//   }
//   return await folder;
// };

// exports.checkFileDimensions = checkFileDimensions;

/**
 * 
 * ffmpeg -framerate 12 -y -f image2 -pattern_type glob -i '*.png' -vf "scale=360:360:eval=frame,split [a][b]; [a] palettegen=stats_mode=single [P]; [b][P] paletteuse=new=1" -f gif output3.gif
 * 
 
 for f in *.png; do ffmpeg -y -i "$f" -vf "scale=480:480:eval=frame" ../copies/"$f"; done; cd ../copies/; ffmpeg -y -f image2 -framerate 5 -pattern_type glob -i '*.png' -vf "scale=360:-1,
 split [a][b]; [a] palettegen=stats_mode=single [P]; [b][P] paletteuse=new=1" -f gif -pix_fmt pal8 output.gif


 * 
 */
