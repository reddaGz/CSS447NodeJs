const fs = require('fs');
const http = require('http');
    http.createServer((req, res) => {
        if (req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
          fs.createReadStream('index.html').pipe(res); 
        }
       else if (req.url === '/messsage' && req.method === 'POST') {
            const body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
                fs.writeFileSync('text.txt', Buffer.concat(body).
                toString().split('=')[1]);
            });
            res.setHeader("Location", "/");
            return res.end();
        }   
    }).listen(443);