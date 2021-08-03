const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs-extra');
const sizeOf = require('image-size');

const getDimensions = () => {
  const folder = path.join(__dirname, '../media/uploads/images');
  const firstFile = fs.readdirSync(folder)[0]

  const dimensions = sizeOf(`${folder}/${firstFile}`);
  return dimensions;
}

const embossFilter = 'convolution=-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2'


const handleImages = async (input, output, filters) => {
  const dimensions = getDimensions();
  const filter = buildFilter(filters);
  console.log(filter);
  const width = dimensions.width || 480;
  const height = dimensions.height || -1;
  return ffmpeg(input)
    .fps(12)
    .inputOptions(['-y', '-f image2', '-pattern_type glob'])
    .complexFilter([filter])
    .save(output);
    // .complexFilter([`[0:v] fps=12,scale=w=${width}:h=${height},split [a][b];[a] palettegen [p];[b][p] paletteuse,${embossFilter}`])
};


// const getFilters = (filters) => {
//   const filter = Object.entries(filters.color.hue)
//     .filter((option) => typeof option[1] === 'number')
//     .map((arr) => arr.join('='))
//     .join(':');
//   return filter;
// };

const handleVideo = async (input, output, filters) => {

  const filter = buildFilter(filters);
  return ffmpeg(input)
    .inputOptions(['-y'])
    .complexFilter(filter)
    .save(output);
    // .complexFilter([`[0:v] scale=w=240:h=-1,hflip,hue=h=7:s=-4:b=4,vflip,split [a][b];[a] palettegen [p];[b][p] paletteuse`])
    // .complexFilter([`[0:v] fps=12,scale=w=480:h=-1,split [a][b];[a] palettegen [p];[b][p] paletteuse,${embossFilter}`])
};

const handleVideoStream = async (req, res, next) => {
  const input = req.file.path;
  const filters = JSON.parse(req.body.filters);
  const output = path.join(__dirname, '../media/downloads', `${Date.now()}.gif`);

  return await handleVideo(input, output, filters)
    .then((command) => {
      command.on('end', (data) => {
        res.status(201).send('success');
      });
      command.on('error', (error) => {
        console.log(error);
        next(error);
      });
    })
    .catch((error) => {
      next(error);
    });
};

const handleImageStream = async (req, res, next) => {
  const destination = req.files[0].destination;
  const filters = JSON.parse(req.body.filters);
  console.log(filters);
  const ext = req.files[0].filename.split('.')[1];
  const input = path.join(destination, `*.${ext}`);
  const output = path.join(__dirname, '../media/downloads', `${Date.now()}.gif`);

  return await handleImages(input, output, filters)
    .then((command) => {
      command.on('end', (data) => {
        res.status(201).send('sucess');
      });
      command.on('error', (error) => {
        console.log(error);
        next(error);
      });
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
};

module.exports = {
  handleImageStream,
  handleVideoStream,
};

function hasValues(obj) {
  return Object.values(obj).some(value => value);
}

function buildHueFilter(obj) {
  if (!hasValues(obj)) {
    return;
  }
  let filter = 'hue=';
  Object.entries(obj).forEach(entry => {
    if (entry[1] !== null) {
      filter += `${entry[0]}=${entry[1]}:`;
    }
  })
  return filter.slice(0, -1) + ',';
}


function buildFilter(obj) {
  let filter = '[0:v] scale=w=240:h=-1,';
  const endFilter = 'split [a][b];[a] palettegen [p];[b][p] paletteuse';
  
  Object.entries(obj).forEach(entry => {
    const name = entry[0];
    const value = entry[1];
    if (typeof value === 'boolean' && value) {
      if (name === 'emboss') {
        filter += 'convolution=-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2,'
      }
      else if (name === 'hflip' || name === 'vflip') {
        filter += `${name},`;
      }
      else {
        filter += `${name}=${value},`;
      }
    }
    if (typeof value !== 'boolean') {
      if (!isNaN(Number(value))) {
        filter += `${name}=${value},`;
      }
    }
    if (typeof value === 'object') {
      const hueFilter = buildHueFilter(value);
      if (hueFilter) {
        filter += hueFilter;
      }
    }
  })
  filter += endFilter;
  return filter; 
}