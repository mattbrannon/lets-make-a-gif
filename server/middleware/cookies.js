const fs = require('fs-extra');
const path = require('path');
const cookieParser = require('cookie-parser');

const createDir = (id) => {
  const subFolders = [ 'copies', 'images', 'output', 'videos' ];
  const mainFolder = path.resolve(path.join(__dirname, '../../media', id));
  subFolders.map((folder) => {
    const userFolder = path.resolve(path.join(mainFolder, folder));
    fs.ensureDirSync(userFolder);
  });
};

const handleCookies = async (req, res, next) => {
  const cookies = cookieParser.JSONCookies(req.cookies);
  if (!('id' in cookies)) {
    const id = Date.now().toString();
    await createDir(id);
    req.userId = id;
    res.cookie('id', id, { maxAge: 900000, httpOnly: true });
  }
  else {
    req.userId = cookies.id;
  }
  next();
};

exports.handleCookies = handleCookies;
