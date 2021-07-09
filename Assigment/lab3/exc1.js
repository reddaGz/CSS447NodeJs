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
                console.log(body)
                let data=Buffer.concat(body).
                toString().split('=')[1]
                let read =fs.readFileSync('text.txt')
                let userData=read+' '+data
                fs.writeFileSync('text.txt',userData );
            });
            res.statusCode = 302;
            res.setHeader("Location", "/");
            res.end();//b.c to redirect the page
        }   
    }).listen(443);