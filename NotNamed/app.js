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

var io = require('socket.io')(serv, {});
io.sockets.on('connection', function (socket) {
	console.log("hello");
});




setInterval(function () {

}, 1000 / 25);
