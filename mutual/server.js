const fs = require('fs');
const https = require('https');

https
    .createServer(
        {
            cert: fs.readFileSync('localhost.crt'),
            requestCert: true,
            rejectUnauthorized: false,
            ca: fs.readFileSync('ca.crt'),

        },
        (req, res) => {
            if (!req.client.authorized) {
                res.writeHead(401);
                return res.end('Invalid client certificate authentication.');
            }
            res.writeHead(200);
            res.end('Hello, through Mutual TLS!');
        }
    )
    .listen(9443, () => console.log('Server Started on https://localhost:9443'));