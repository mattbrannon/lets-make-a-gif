const cookieParser = require('cookie-parser');

const cookieSetter = (req, res, next) => {
  const cookies = cookieParser.JSONCookies(req.cookies);
  if (!('id' in cookies)) {
    const id = Date.now().toString();
    res.locals.userId = id;
    req.userId = id;
    res.cookie('id', id, { maxAge: 31500000000, httpOnly: true });
  }
  else {
    res.locals.userId = cookies.id;
    req.userId = cookies.id;
  }

  next();
};

module.exports = { cookieSetter };

// const createDir = (id) => {
//   const subFolders = [ 'copies', 'images', 'output', 'videos', 'original' ];
//   const mainFolder = path.resolve(path.join(__dirname, '../../media', id));
//   subFolders.map((folder) => {
//     const userFolder = path.resolve(path.join(mainFolder, folder));
//     fs.ensureDirSync(userFolder);
//   });
// };

// const handleCookies = async (req, res, next) => {
//   const cookies = cookieParser.JSONCookies(req.cookies);
//   if (!('id' in cookies)) {
//     const id = Date.now().toString();
//     await createDir(id);
//     req.userId = id;
//     res.locals.userId = id;
//     res.cookie('id', id, { maxAge: 31500000000, httpOnly: true });
//   }
//   else {
//     req.userId = cookies.id;
//     res.locals.userId = cookies.id;
//   }
//   next();
// };

// exports.handleCookies = handleCookies;
