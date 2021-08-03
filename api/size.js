const sizeOf = require('image-size');
const path = require('path');
const fs = require('fs-extra');

const folder = path.join(__dirname, '../media/uploads/videos');
const firstFile = fs.readdirSync(folder)[0]


const dimensions = sizeOf(`${folder}/${firstFile}`);

console.log(dimensions);