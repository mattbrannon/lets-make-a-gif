const path = require('path');

const parseRequest = (req) => {
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

exports.parseRequest = parseRequest;
exports.getPathToFolder = getPathToFolder;
