let fs = require("fs");
let zlib = require('zlib');
const path=require('path')
// fs.createReadStream('./input.txt')
//     .pipe(zlib.createGunzip())
//     .pipe(fs.createWriteStream('./inputZip.txt.gz'));
// console.log("File Decompressed.");


fs.createReadStream(path.join(__dirname, 'input.txt')).
pipe(zlib.createGzip()).
pipe(fs.createWriteStream(path.join(__dirname, 'zipInput.txt.gz')));