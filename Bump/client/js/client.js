var socket = io();

//CANVAS VARIABLES
var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var scale = .75 * this.height / 100;
c.mozImageSmoothingEnabled = false;
c.webkitImageSmoothingEnabled = false;
c.msImageSmoothingEnabled = false;
c.imageSmoothingEnabled = false;

var count = 0;

var ID;
var self = new Player();
var mouseX = 0;
var mouseY = 0;

window.addEventListener('resize', resize, false);

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    scale = .75 * this.height / 100;

    c.mozImageSmoothingEnabled = false;
    c.webkitImageSmoothingEnabled = false;
    c.msImageSmoothingEnabled = false;
    c.imageSmoothingEnabled = false;
}

var Game = {
    image: null,
    run: function () {
        var now;
        var dt = 0;
        var last = timestamp();
        var slow = 1; // slow motion scaling factor
        var step = 1 / 60;
        var slowStep = slow * step;

        Game.image = new Image();
        Game.image.loaded = false;
        Game.image.addEventListener('load', function () {
            Game.image.loaded = true;
        }, false);
        Game.image.src = "client/res/SPRITE_SHEET_C.png";

        var fpsmeter = new FPSMeter({
            decimals: 0,
            graph: true,
            heat: true,
            heatOn: 'backgroundColor',
            theme: 'colorful',
            left: '5px'
        });

        var frame = function () {
            fpsmeter.tickStart();
            now = timestamp();
            dt = dt + Math.min(1, (now - last) / 1000);

            while (dt > slowStep) {
                dt = dt - slowStep;
                Game.update(step);
            }

            Game.render(dt / slow);
            last = now;
            fpsmeter.tick();
            requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);
    },

    update: function (step) {

    },

    render: function (step) {
        c.clearRect(0, 0, width, height);

        if (Game.image.loaded && self) {
            self.render(c, Game.image);
        }



        //if (Game.image.loaded) {
        //    c.drawImage(Game.image, 0, 0, Game.image.width, Game.image.height, 100, 100, Game.image.width * scale, Game.image.height * scale);
        //}
    }
}

socket.on('connected', function (data) {
    ID = data.id;
    console.log("Your ID: " + ID);
});

socket.on('update', function (data) {
    //c.resetTransform();
    if (self) {
        for (var i in data) {
            var p = data[i];
            if (p.id == ID) {
                self.update(p.x, p.y, p.size);
            }
        }

    }

    /*
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
    */

    //c.translate(disX, disY);

});

document.onmousemove = function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

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

Game.run();








/*var socket = io();

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

  console.log("HAT");

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
              //c.fillStyle = 'gray';
              if (tile.state < 0 || tile.state > 255) {
                  tile.state = "0";
              }
              var hue = 'rgb(' + (tile.state) + ',' + (tile.state) + ',' + (tile.state) + ')';
              c.fillStyle = hue;

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
          c.stroke();
      }
      
      

      for (var i = 0; i < data.length; i++) {
          if (count < data.length) {
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
  
  */
