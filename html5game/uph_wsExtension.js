
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
