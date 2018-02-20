//#####const Map = require('./Map.js');
//#####const Player = require('./Player.js');
var Util = require('./Util.js');
var Log = require('./Log.js');
var express = require('express');

var app = express();
var serv = require('http').Server(app);
var gameport = 2000;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
//If the server specifies something specific but it has to be in the client folder.
app.use('/client', express.static(__dirname + '/client'));

//#####Map.create();

serv.listen(gameport);
//console.log('server started');
Log("app", "Server Started", "info", true);

var SOCKET_LIST = {};

var io = require('socket.io')(serv, {});
io.sockets.on('connection', function (socket) {
    socket.id = Util.getRandomId();
    SOCKET_LIST[socket.id] = socket;

    socket.emit('connected', socket.id);

    //#####Player.onConnect(socket);

    socket.on('disconnect', function () {
        Player.onDisconnect(socket);
        delete SOCKET_LIST[socket.id];
    });
});

setInterval(function () {
    //var pack = {
    //	player: Player.update()
    //}
    //#####Player.update();
    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        //#####var mapPack = Player.getMapInfo(socket);
        //#####var playerPack = Player.getInfo(socket);
        //#####socket.emit('update', playerPack, mapPack);
    }
}, 1000 / 25);
