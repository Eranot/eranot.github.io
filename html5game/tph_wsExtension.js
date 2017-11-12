
var socket
var message = ""

function my_connect(){
    socket = new WebSocket("ws://guarded-journey-96044.herokuapp.com/:12345") 

    socket.onmessage = function(event) {
        message = event.data
    };

    return "teste"
}

function hasMessage(){
    if(socket == null){
        return false
    }
    return message.length > 0
}

function getState(){
    return socket.readyState
}

function getMessage(){
    var temp = message
    message = ""

    return temp
}

function sendMessage(){
    socket.send("teste")

    return true
}

function switchValues(x1v, y1v, x2v, y2v){
    var obj = {type: "switch",
        x1: x1v,
        x2: x2v,
        y1: y1v,
        y2: y2v
    }

    socket.send(JSON.stringify(obj))
    return true
}

function evokeMinion(x1, y1){
    var obj = {type: "evoke",
        x: x1,
        y: y1,
    }

    socket.send(JSON.stringify(obj))
    return true
}
