var express = require('express');
var app = express();
var serv = require('http').Server(app);
var gameport = 2000;

//If the query is anything not otherwise specified do this.
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
//If the server specifies something specific but it has to be in the client folder.
app.use('/', express.static(__dirname + '/'));

serv.listen(gameport);
console.log('server started');