var socket = io.connect('http://localhost:3001');;

window.onload = function () {
    //var socket = io();
    var id = null;

    var canvas = document.getElementById('canvas');
    var c = canvas.getContext('2d');
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    /*socket.on('playerId', function (data) {
        id = data.id;
    });*/

    var draw = function () {
        window.requestAnimationFrame(draw);
    }
    
    draw();
    console.log("Game Loaded Successfuly");
}
