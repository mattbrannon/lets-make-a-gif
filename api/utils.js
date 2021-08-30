const path = require('path');
const fs = require('fs-extra');

const parseRequest = (req) => {
  // const userId = req.userId;
  const filter = req.body.filterString;
  const filters = typeof req.body.filters === 'string' ? JSON.parse(req.body.filters) : req.body.filters;
  const framerate = filters.framerate;
  return { framerate, filter };
};

const getPathToFolder = (name, userId) => {
  const names = [ 'images', 'videos', 'output', 'copies' ];
  if (userId && names.includes(name)) {
    const pathToFolder = path.join(__dirname, `../media/${userId}/${name}`);
    return pathToFolder;
  }
  return null;
};

const getGlobPattern = (pathToFolder) => {
  const firstFile = fs.readdirSync(pathToFolder)[0];
  const ext = path.extname(firstFile);

  const globPattern = path.resolve(pathToFolder, `*${ext}`);

  return { globPattern };
};

const getFilterString = (filter) => {
  const filterParts = [ 'split [a][b]; [a] palettegen [P]; [b][P] paletteuse' ];
  if (filter.length) {
    filterParts.unshift(filter);
  }
  return filterParts;
};
exports.parseRequest = parseRequest;
exports.getPathToFolder = getPathToFolder;
exports.getGlobPattern = getGlobPattern;
