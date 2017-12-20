 var socket = io();

 //CANVAS VARIABLES
 var canvas = document.getElementById('canvas');
 var c = canvas.getContext('2d');
 width = canvas.width = window.innerWidth;
 height = canvas.height = window.innerHeight;

 window.addEventListener('resize', resize, false);

 //window.onload = function () {
 // 	draw();
 // }

 function resize() {
 	width = canvas.width = window.innerWidth;
 	height = canvas.height = window.innerHeight;
 }

 //function draw() {
 // 	c.fillRect(0, 0, width, height);
 // 	window.requestAnimationFrame(draw);
 // }

 socket.on('update', function (data) {
 	c.clearRect(0, 0, width, height);
 	for (var i = 0; i < data.length; i++) {
 		c.fillStyle = "black";
 		c.fillRect(data[i].x, data[i].y, 15, 15);
 	}
 });

 document.onkeydown = function (event) {
 	if (event.keyCode === 68) //d
 		socket.emit('keyPress', {
 			inputId: 'right',
 			state: true
 		});
 	else if (event.keyCode === 83) //s
 		socket.emit('keyPress', {
 			inputId: 'down',
 			state: true
 		});
 	else if (event.keyCode === 65) //a
 		socket.emit('keyPress', {
 			inputId: 'left',
 			state: true
 		});
 	else if (event.keyCode === 87) // w
 		socket.emit('keyPress', {
 			inputId: 'up',
 			state: true
 		});

 }
 document.onkeyup = function (event) {
 	if (event.keyCode === 68) //d
 		socket.emit('keyPress', {
 			inputId: 'right',
 			state: false
 		});
 	else if (event.keyCode === 83) //s
 		socket.emit('keyPress', {
 			inputId: 'down',
 			state: false
 		});
 	else if (event.keyCode === 65) //a
 		socket.emit('keyPress', {
 			inputId: 'left',
 			state: false
 		});
 	else if (event.keyCode === 87) // w
 		socket.emit('keyPress', {
 			inputId: 'up',
 			state: false
 		});
 }