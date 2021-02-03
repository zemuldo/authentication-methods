const fs = require('fs');
const https = require('https');

const req = https.request(
    {
        hostname: 'localhost',
        port: 9443,
        path: '/',
        method: 'GET',
        cert: fs.readFileSync('client.crt'),
        key: fs.readFileSync('client.key'),
        ca: fs.readFileSync('ca.crt')
    },
    res => {
        res.on('data', function (data) {
            console.log(data.toString())
        });
    }
);

req.end();