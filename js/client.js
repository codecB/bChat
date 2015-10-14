var WebSocket = require('ws');
var ws = new WebSocket('ws://127.0.0.1:4080/');

ws.on('open', function open() {
    ws.send('from client');
});

ws.on('message', function(data, flags) {
    // flags.binary will be set if a binary data is received.
    // flags.masked will be set if the data was masked.
    console.log("received: "+data);
});
