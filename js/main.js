var ws = new WebSocket("ws://127.0.0.1:4080/", "protocolOne");

ws.onopen = function (event) {
    //ws.send(JSON.stringify({name:document.getElementById("name").value}));
};

ws.onmessage = function (event) {
    document.getElementById("response").innerHTML += event.data +"<br>";
    //console.log(event.data);
}

window.onload = function () {
    document.getElementById("message").onkeyup = function (event) {
        if(event.keyCode == 13){//enter key pressed

            var name = document.getElementById("name").value;
            var message = document.getElementById("message").value;
            var date = new Date();
            var currentTime = ("0" + date.getHours()).slice(-2)+":"+("0" + date.getMinutes()).slice(-2)+":"+("0" + date.getSeconds()).slice(-2);

            ws.send(currentTime + " "+name+": " +message);

            //document.getElementById("response").innerHTML += currentTime + " me: " + document.getElementById("message").value +"<br>";
            document.getElementById("message").value = "";
        }
    };
}