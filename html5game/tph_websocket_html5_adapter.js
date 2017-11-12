/**
Client-Side WebSocket Bindings for GameMaker Studio
Author: Dickson Law
(C) GameGeisha Interactive, 2010-2014
*/

var __ws_sockets__ = new Array();

function __ws_connect__(url) {
	return __ws_connect_ext__(url, "");
}

function __ws_connect_ext__(url, protocols) {
	var ws, id;
	
	//Try to create the WebSocket
	try {
		if (protocols == "") {
			ws = new WebSocket(url);
		}
		else {
			ws = new WebSocket(url, protocols.split('|'));
		}
	}
	catch (e) {
		return -1;
	}
	
	//Add the WebSocket
	id = __ws_sockets__.push({
		socket: ws,
		inbox: new Array()
	})-1;
	
	//Tack on events
	ws.onmessage = function(event) {
		__ws_sockets__[id].inbox.push(event.data);
	};
	
	//Return numeric handle
	return id;
}

function __ws_status__(id) {
	try {
		return __ws_sockets__[id].socket.readyState;
	}
	catch (e) {
		return -1;
	}
}

function __ws_disconnect__(id) {
	return __ws_disconnect_ext__(id, 1000, "");
}

function __ws_disconnect_ext__(id, code, reason) {
	try {
		__ws_sockets__[id].socket.close(code, reason);
	}
	catch (e) {
		return false;
	}
}

function __ws_send_message__(id, msg) {
	try {
		__ws_sockets__[id].socket.send(msg);
		return true;
	}
	catch (e) {
		return false;
	}
}

function __ws_has_message__(id) {
	try {
		return __ws_sockets__[id].inbox.length > 0;
	}
	catch (e) {
		return false;
	}
}

function __ws_get_message__(id) {
	try {
		return (__ws_sockets__[id].inbox.splice(0, 1))[0] || "";
	}
	catch (e) {
		return "";
	}
}