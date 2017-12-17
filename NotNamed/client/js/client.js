 var socket = io();

 //CANVAS VARIABLES
 var canvas = document.getElementById('canvas');
 var c = canvas.getContext('2d');
 width = canvas.width = window.innerWidth;
 height = canvas.height = window.innerHeight;

 window.addEventListener('resize', resize, false);

 window.onload = function () {
 	draw();
 }

 function resize() {
 	width = canvas.width = window.innerWidth;
 	height = canvas.height = window.innerHeight;
 }

 function draw() {
 	c.fillStyle = "#FF00FF";
 	c.fillRect(0, 0, width, height);
 	window.requestAnimationFrame(draw);
 }
