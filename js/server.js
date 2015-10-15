/**
 * This is the web server and the web socket server all together.
 */

var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");
var fs = require('fs');
var url = require('url');
var app = express();
var port = process.env.PORT || 4080;
var clients = [];

//app.use(express.static(__dirname + "/"));

// Catch everything else and redirect to /index.html
// Of course you could send the file's content with fs.readFile to avoid
// using redirects
app.get('/', function(request, response) {
    jsresponse.redirect("/html/index.html");
});

app.get('*', function(request, response) {
    handleRequest(request, response);
});

function handleRequest(request, response){
    // Parse the request containing file name
    var pathname = url.parse(request.url).pathname;

    // Print the name of the file for which request is made.
    console.log("Request for " + pathname + " received.");

    // Read the requested file content from file system
    pathname = "/.."+ pathname;

    //pathname="/../html/index.html";

    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            // HTTP Status: 404 : NOT FOUND
            // Content Type: text/plain
            response.writeHead(404, {'Content-Type': 'text/html'});
        }else{
            //Page found
            // HTTP Status: 200 : OK
            // Content Type: text/plain
            response.writeHead(200, {'Content-Type': 'text/html'});

            // Write the content of the file to response body
            response.write(data.toString());
        }
        // Send the response body
        response.end();
    });
}

var server = app.listen(port, function () {
    console.log("http server listening on %d", port);
});



var wss = new WebSocketServer({server: server});
console.log("websocket server created");

wss.on("connection", function(ws) {
    clients.push(ws);
    var location = url.parse(ws.upgradeReq.url, true);
    // you might use location.query.access_token to authenticate or share sessions
    // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

    ws.on('message', function incoming(message) {
        console.log('server received: %s', message);
        broadcast(message);
    });
    //ws.send('server: you are connected as client no.'+(clients.length));
    broadcast("server: client no."+clients.length+ " has logged in");
});

function broadcast (message) {

    for (var i=0; i<clients.length;) {
        try {
            clients[i].send(message);
            i++;
        }catch(e){
            console.log(e.message);
            clients.splice(i,1);
        }
    }
}
