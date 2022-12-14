// var http = require('http');
// var url = require('url');
// var fs = require('fs');

// http.createServer(function (req, res) {
//     var q = url.parse(req.url, true);
//     var filename = "./public" + q.pathname;
//     fs.readFile(filename, function (err, data) {
//         if (err) {
//             res.writeHead(404, { 'Content-Type': 'text/html' });
//             return res.end("404 Not Found");
//         }
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.write(data);
//         return res.end();
//     });
// }).listen(8080);

const express = require('express');
const path = require('path');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/build'))

console.log('Getting Index at ' + __dirname + '/build/index.html');
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});

const server = app.listen(port);
console.log('Server started at http://localhost:' + port);

rl.question('', function (response) {
    if (response.toLowerCase() === 'close') {
        console.log('Closing Server!');
        server.close();
        process.exit(0);
    }
});