var Player = require("./Player");

var express = require('express');
var app = express();
var serv = require('http').Server(app);
var gameport = 2000;

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
//If the server specifies something specific but it has to be in the client folder.
app.use('/client', express.static(__dirname + '/client'));

serv.listen(gameport);
console.log('server started');

var SOCKET_LIST = {};

var io = require('socket.io')(serv, {});
io.sockets.on('connection', function (socket) {
	socket.id = ID();
	SOCKET_LIST[socket.id] = socket;

	Player.onConnect(socket);

	socket.on('disconnect', function () {
		Player.onDisconnect(socket);
		delete SOCKET_LIST[socket.id];
	});
});

setInterval(function () {
	//var pack = {
	//	player: Player.update()
	//}
	Player.update();
	for (var i in SOCKET_LIST) {
		var socket = SOCKET_LIST[i];
		var pack = Player.getInfo(socket);
		socket.emit('update', pack);
	}
}, 1000 / 25);

function ID() {
	return Math.random().toString(20).substr(2, 11);
}
