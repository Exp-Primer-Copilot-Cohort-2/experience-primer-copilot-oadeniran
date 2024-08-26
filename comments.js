// Create web server
// test: curl -d "comment=hello" http://localhost:3000/comments
// test: curl http://localhost:3000/comments

var http = require('http');
var qs = require('querystring');

var comments = [];
var server = http.createServer(function (req, res) {
    if ('/' == req.url) {
        switch (req.method) {
            case 'GET':
                show(res);
                break;
            case 'POST':
                add(req, res);
                break;
            default:
                badRequest(res);
        }
    } else {
        notFound(res);
    }
});

function show(res) {
    var html = '<html><head><title>Comments</title></head><body>'
        + '<h1>Comments</h1>'
        + '<ul>'
        + comments.map(function (comment) {
            return '<li>' + comment + '</li>'
        }).join('')
        + '</ul>'
        + '<form method="post" action="/">'
        + '<input type="text" name="comment" />'
        + '<input type="submit" value="Add Comment" />'
        + '</form></body></html>';
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

function add(req, res) {
    var body = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        var obj = qs.parse(body);
        comments.push(obj.comment);
        show(res);
    });
}

function badRequest(res) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bad Request');
}

function notFound(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
}

server.listen(3000);

// Node.js: Up and Running
// Comments example from Chapter 2: Building a Simple Web Application
// http://oreilly.com/catalog/0636920015956
//