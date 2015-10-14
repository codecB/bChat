var server = require('http').createServer()
    , url = require('url')
    , WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ server: server })
    , express = require('express')
    , app = express()
    , port = 4080
    , clients=[];


//app.use(function (req, res) {
//    res.send({ msg: "hello" });
//});

wss.on('connection', function connection(ws) {
    clients.push(ws);
    var location = url.parse(ws.upgradeReq.url, true);
    // you might use location.query.access_token to authenticate or share sessions
    // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

    ws.on('message', function incoming(message) {
        console.log('server received: %s', message);
        broadcast(message);
        //var delay = Math.floor((Math.random() * 3000) + 1000);
        //setTimeout(function(){
        //    var date = new Date();
        //    var currentTime = ("0" + date.getHours()).slice(-2)+":"+("0" + date.getMinutes()).slice(-2)+":"+("0" + date.getSeconds()).slice(-2);
        //    //ws.send(currentTime + " server: "+ "How can I help you?");
        //    broadcast(message);
        //}, delay);
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

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });