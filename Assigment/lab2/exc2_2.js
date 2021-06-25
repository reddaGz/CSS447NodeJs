const http = require('http');
const fs = require('fs');
const path=require('path');
 http.createServer((req,res)=>{
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
     fs.readFile(path.join(__dirname,'car.jpg'),(err,data)=>{
         res.end(data)
     })
 }).listen(8000)