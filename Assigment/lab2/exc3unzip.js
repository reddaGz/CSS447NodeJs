let fs = require("fs");
let zlib = require('zlib');
const path=require('path')
fs.createReadStream(path.join(__dirname, 'zipInput.txt.gz'),'utf8').
pipe(zlib.createGzip()).
pipe(fs.createWriteStream(path.join(__dirname, 'unzip.txt')));
console.log("File Decompressed.");