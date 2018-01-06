 var socket = io();

 var count = 0;

 //CANVAS VARIABLES
 var canvas = document.getElementById('canvas');
 var c = canvas.getContext('2d');
 width = canvas.width = window.innerWidth;
 height = canvas.height = window.innerHeight;

 var ID;

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

 socket.on('connected', function (data) {
 	ID = data;
 });

 socket.on('update', function (data, map) {
 	c.resetTransform();
 	c.clearRect(0, 0, width, height);

 	var disX = 0;
 	var disY = 0;
 	var screenX = Math.floor(canvas.width / 2);
 	var screenY = Math.floor(canvas.height / 2);
 	for (var i = 0; i < data.length; i++) {
 		if (data[i].id === ID) {
 			disX = (screenX - data[i].x);
 			disY = (screenY - data[i].y);
 		}
 	}

 	c.translate(disX, disY);

 	for (var i = 0; i < map.length; i++) {
 		var tile = map[i];

 		if (tile.wall) {
 			c.fillStyle = 'gray';
 		} else {
 			c.fillStyle = tile.color;
 		}
 		if (tile.walking) {
 			c.fillStyle = 'orange';
 		}

 		c.fillRect(tile.x, tile.y, tile.size, tile.size);
 		c.strokeStyle = "black";
 		c.lineWidth = 3;
 		//c.strokeRect(tile.x, tile.y, tile.size, tile.size);


 		/*c.lineWidth = 10;
 		c.strokeStyle = '#09F';
 		c.beginPath();
 		c.moveTo(tile.x, tile.y);
 		c.lineTo(tile.x + tile.size, tile.y);
 		c.stroke();*/
 	}

 	for (var i = 0; i < data.length; i++) {
 		if (count < data.length) {
 			console.log(data[0]);
 			console.log(data[1]);
 			count++;
 		}
 		c.fillStyle = "black";
 		c.fillRect(data[i].x, data[i].y, data[i].size, data[i].size);
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
 	else if (event.keyCode === 32) // space
 		socket.emit('keyPress', {
 			inputId: 'space',
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
 	else if (event.keyCode === 32) // space
 		socket.emit('keyPress', {
 			inputId: 'space',
 			state: false
 		});
 }
