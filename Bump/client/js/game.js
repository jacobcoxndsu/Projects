function Game() {
    this.socket = io();
    this.ID = null;
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.scale = .75 * this.height / 100;

    this.context.mozImageSmoothingEnabled = false;
    this.context.webkitImageSmoothingEnabled = false;
    this.context.msImageSmoothingEnabled = false;
    this.context.imageSmoothingEnabled = false;

    this.mouseX = 0;
    this.mouseY = 0;

    var i = new Image();
    i.loaded = false;
    i.addEventListener('load', function () {
        i.loaded = true;
    }.bind(GAME), false);
    i.src = "client/res/SPRITE_SHEET_BW.png";

    this.image = i;

    this.socket.on('connected', function (data) {
        GAME.connected(data);
    }.bind(GAME));

    this.socket.on('update', function (data) {
        GAME.update(data);
    }.bind(GAME)); //bind puts the function into the GAME object

    this.PLAYER = new Player(this.width / 2, this.height / 2, 1, this.image);
    this.PLAYERS = [];

    this.run();
}

Game.prototype.connected = function (data) {
    this.ID = data.id;
    if (debug) {
        console.log("Your ID: " + this.ID);
    }
}

Game.prototype.run = function () {
    var Game = this;
    var now;
    var dt = 0;
    var last = timestamp();
    var slow = 1; // slow motion scaling factor
    var step = 1 / 60;
    var slowStep = slow * step;

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
            //Game.update(step);
        }

        Game.render(dt / slow);
        last = now;
        fpsmeter.tick();
        requestAnimationFrame(frame);
    }

    frame();
}

Game.prototype.render = function (step) {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillRect(this.width / 2, this.height / 2, 2, 2);
    this.PLAYER.render(this.context, this.scale);
    for (var i in this.PLAYERS) {
        var p = this.PLAYERS[i];
        p.render(this.context, this.scale);
    }
}

Game.prototype.update = function (data) {
    this.PLAYERS = [];
    for (var i in data) {
        var p = data[i];
        if (p.id === GAME.ID) {
            GAME.PLAYER.updateMousePosition(p.mx, p.my);
        } else {
            var player = new Player(p.x, p.y, p.size, this.image);
            player.updateMousePosition(p.mx, p.my);
            this.PLAYERS.push(player);
        }
    }
}

Game.prototype.onmousemove = function (event) {
    var x = event.clientX;
    var y = event.clientY;

    this.mouseX = x;
    this.mouseY = y;

    this.socket.emit("mouseUpdate", {
        mx: x,
        my: y
    });
}

Game.prototype.onkeydown = function (event) {
    if (event.keyCode === 68) //d
        this.socket.emit('keyPress', {
            inputId: 'right',
            state: true
        });
    else if (event.keyCode === 83) //s
        this.socket.emit('keyPress', {
            inputId: 'down',
            state: true
        });
    else if (event.keyCode === 65) //a
        this.socket.emit('keyPress', {
            inputId: 'left',
            state: true
        });
    else if (event.keyCode === 87) // w
        this.socket.emit('keyPress', {
            inputId: 'up',
            state: true
        });
    else if (event.keyCode === 32) // space
        this.socket.emit('keyPress', {
            inputId: 'space',
            state: true
        });
}

Game.prototype.onkeyup = function (event) {
    if (event.keyCode === 68) //d
        this.socket.emit('keyPress', {
            inputId: 'right',
            state: false
        });
    else if (event.keyCode === 83) //s
        this.socket.emit('keyPress', {
            inputId: 'down',
            state: false
        });
    else if (event.keyCode === 65) //a
        this.socket.emit('keyPress', {
            inputId: 'left',
            state: false
        });
    else if (event.keyCode === 87) // w
        this.socket.emit('keyPress', {
            inputId: 'up',
            state: false
        });
    else if (event.keyCode === 32) // space
        this.socket.emit('keyPress', {
            inputId: 'space',
            state: false
        });
}

Game.prototype.resize = function () {
    this.context = this.canvas.getContext('2d');
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.scale = .75 * this.height / 100;

    this.context.mozImageSmoothingEnabled = false;
    this.context.webkitImageSmoothingEnabled = false;
    this.context.msImageSmoothingEnabled = false;
    this.context.imageSmoothingEnabled = false;
}
