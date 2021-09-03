// const path = require('path');

// const parseRequest = (req) => {
//   const filter = req.body.filterString;
//   const filters = typeof req.body.filters === 'string' ? JSON.parse(req.body.filters) : req.body.filters;
//   const framerate = filters.framerate;
//   return { framerate, filter };
// };

// const getPathToFolder = (name, userId) => {
//   const names = [ 'images', 'videos', 'output', 'copies' ];
//   if (userId && names.includes(name)) {
//     const pathToFolder = path.join(__dirname, `../media/${userId}/${name}`);
//     return pathToFolder;
//   }
//   return null;
// };

// exports.parseRequest = parseRequest;
// exports.getPathToFolder = getPathToFolder;

// // const ffprobe = ffmpeg.ffprobe;

// // const getFps = (file) => {
// //   return new Promise((resolve, reject) => {
// //     ffprobe(file, (error, data) => {
// //       if (error) reject(error);

// //       const n = data.streams
// //         .filter((obj) => obj.codec_type === 'video')
// //         .map((obj) => obj.r_frame_rate)[0]
// //         .split('/')
// //         .map(Number)
// //         .reduce((a, b) => Math.floor(Math.round(a / b) / 2));
// //       resolve(n);
// //     });
// //   });
// // };
