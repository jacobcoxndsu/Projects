var Util = require('./Util.js');
var Log = require('./Log.js');
var express = require('express');

var app = express();
var serv = require('http').Server(app);
var port = 2000;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
//If the server specifies something specific but it has to be in the client folder.
app.use('/client', express.static(__dirname + '/client'));

serv.listen(port);
//console.log('server started');
Log("app", "Server Started", "info", true);

var SOCKET_LIST = {};

var io = require('socket.io')(serv, {});
io.sockets.on('connection', function (socket) {
    socket.id = Util.getRandomId();
    SOCKET_LIST[socket.id] = socket;

    //socket.emit('connected', socket.id);

    socket.on('disconnect', function () {
        delete SOCKET_LIST[socket.id];
    });

    socket.on("pressed", function (data) {
        for (var i in SOCKET_LIST) {
            var s = SOCKET_LIST[i];
            if (s.id != socket.id) {
                s.emit('send', data);
            }
        }
    });

    /*socket.on('ON', function () {
        for (var i in SOCKET_LIST) {
            var s = SOCKET_LIST[i];
            s.emit('START');
        }
    });

    socket.on('OFF', function () {
        for (var i in SOCKET_LIST) {
            var s = SOCKET_LIST[i];
            s.emit('STOP');
        }
    });*/
});
