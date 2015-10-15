var ws = new WebSocket("ws://"+window.location.hostname+":4080/", "protocolOne");

ws.onopen = function (event) {
    //ws.send(JSON.stringify({name:document.getElementById("name").value}));
};

ws.onmessage = function (event) {
    var elem = document.getElementById('content');
    elem.innerHTML += event.data +"<br>";//update chat history
    elem.scrollTop = elem.scrollHeight; //scroll to bottom
}

window.onload = function () {
    document.getElementById("message").onkeyup = function (event) {
        if(event.keyCode == 13){//enter key pressed

            var name = document.getElementById("myname").value.trim();
            if (name == ''){
                alert("Must specify your name.");
                return;
            }
            var message = document.getElementById("message").value;
            var date = new Date();
            var currentTime = ("0" + date.getHours()).slice(-2)+":"+("0" + date.getMinutes()).slice(-2)+":"+("0" + date.getSeconds()).slice(-2);

            ws.send(currentTime + " "+name+": " +message);

            //document.getElementById("content").innerHTML += currentTime + " me: " + document.getElementById("message").value +"<br>";
            document.getElementById("message").value = "";
        }
    };

    document.getElementById("clear").onclick = function(){
        document.getElementById("content").innerHTML = "";
    }

    document.getElementById("b_login").onclick = function(){
        var username = document.getElementById("name").value.trim();
        if(username == ''){
            alert("Must specify your name.");
            return;
        }
        document.getElementById("myname").value = username;

        document.getElementById("login").style.display = 'none';
        document.getElementById("chatroom").style.display = 'block';

    }
}