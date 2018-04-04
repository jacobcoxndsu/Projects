 var socket = io();

 //CANVAS VARIABLES
 var canvas = document.getElementById('canvas');
 var c = canvas.getContext('2d');
 var width = canvas.width = window.innerWidth;
 var height = canvas.height = window.innerHeight;
 var audio = document.getElementById('audio');
 c.fillStyle = "rgb(" + 59 + "," + 95 + "," + 117 + ")";
 c.fillRect(0, 0, width, height);
 c.fillStyle = "darkgray";
 c.textAlign = "center";
 c.font = "20px Arial";
 c.fillText("Press \"SPACE\", \"B\", or \"DOWN ARROW\" to send Morse Code.", width / 2, height / 2);
 var pressing = false;
 var time = 0;
 //var ID = null;

 window.addEventListener('resize', resize, false);

 function resize() {
     width = canvas.width = window.innerWidth;
     height = canvas.height = window.innerHeight;
 }

 //socket.on('connected', function (data) {
 //     ID = data;
 // });

 socket.on('send', function (data) {
     playSound(data);
 });

 document.onkeydown = function (event) {
     if (!pressing) {
         if (event.keyCode === 32 || event.keyCode === 40 || event.keyCode === 66) {
             playMySound();
             pressing = true;
             time = timestamp();
         }
     }
 }

 document.onkeyup = function (event) {
     if (event.keyCode === 32 || event.keyCode === 40 || event.keyCode === 66) {
         stopMySound();
         socket.emit("pressed", timestamp() - time);
         time = 0;
         pressing = false;
     }
 }

 function playMySound() {
     audio.play();

     c.fillStyle = "rgb(" + 199 + "," + 222 + "," + 237 + ")";
     c.fillRect(0, 0, width, height);
 }

 function stopMySound() {
     audio.pause();
     audio.currentTime = 3;

     c.fillStyle = "rgb(" + 59 + "," + 95 + "," + 117 + ")";
     c.fillRect(0, 0, width, height);

     c.fillStyle = "darkgray";
     c.fillText("Press \"SPACE\", \"B\", or \"DOWN ARROW\" to send Morse Code.", width / 2, height / 2);
 }

 function playSound(time) {
     c.fillStyle = "rgb(" + 199 + "," + 222 + "," + 237 + ")";
     c.fillRect(0, 0, width, height);
     console.log("TIME: " + time);
     audio.play();
     setTimeout(function () {
         audio.pause();
         audio.currentTime = 3;
         c.fillStyle = "rgb(" + 59 + "," + 95 + "," + 117 + ")";
         c.fillRect(0, 0, width, height);

         c.fillStyle = "darkgray";
         c.fillText("Press \"SPACE\", \"B\", or \"DOWN ARROW\" to send Morse Code.", width / 2, height / 2);
     }, time);
 }

 function timestamp() {
     return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
 }
