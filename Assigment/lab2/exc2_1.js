const http = require('http');
const fs = require('fs');
const path=require('path');
 http.createServer((req,res)=>{
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
   fs.createReadStream('./car.jpg').pipe(res)
 }).listen(8000)