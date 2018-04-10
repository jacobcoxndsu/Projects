var Log = require('./Log.js');

var PLAYER_LIST = {};

module.exports = class Player {
    constructor(id, x, y) {

        // ID
        this.id = id;
        // position
        this.x = x || 0;
        this.y = y || 0;
        // velocity
        this.vx = 7;
        this.vy = 7;
        // acceleration
        this.ax = 0.5;
        this.ay = 0.5;
        // size
        this.size = 10;

        // Movement Booleans
        this.pressingRight = false;
        this.pressingLeft = false;
        this.pressingUp = false;
        this.pressingDown = false;
        this.pressingSpace = false;

        this.mouseX = 0;
        this.mouseY = 0;

        PLAYER_LIST[id] = this;

        Log("Player", "Player Created with id: " + id, "info");
    }

    updatePosition() {
        if (this.pressingUp) {
            this.y -= this.vy;
        }

        if (this.pressingDown) {
            this.y += this.vy;
        }

        if (this.pressingLeft) {
            this.x -= this.vx;
        }

        if (this.pressingRight) {
            this.x += this.vx;
        }
    }

    getData() {
        var pack = {
            id: this.id,
            x: this.x,
            y: this.y,
            size: this.size,
            mx: this.mouseX,
            my: this.mouseY
        }

        return pack;
    }

    getDistance(pt) {
        return Math.sqrt(Math.pow(this.x - pt.x, 2) + Math.pow(this.y - pt.y, 2));
    }

    updateMousePosition(x, y) {
        this.mouseX = x;
        this.mouseY = y;
    }

    static onConnect(socket) {
        var player = new Player(socket.id, 200, 200);

        socket.on('keyPress', function (data) {
            if (data.inputId === 'left') {
                player.pressingLeft = data.state;
            } else if (data.inputId === 'right') {
                player.pressingRight = data.state;
            } else if (data.inputId === 'up') {
                player.pressingUp = data.state;
            } else if (data.inputId === 'down') {
                player.pressingDown = data.state;
            } else if (data.inputId === 'space') {
                player.pressingSpace = data.state;
            }
        });

        socket.on('mouseUpdate', function (data) {
            player.updateMousePosition(data.mx, data.my);
        });
    }

    static onDisconnect(socket) {
        var player = PLAYER_LIST[socket.id];
        Log("Player", "Player Deleted with id: " + player.id, "info");
        delete PLAYER_LIST[socket.id];
    }

    static update() {
        for (var i in PLAYER_LIST) {
            PLAYER_LIST[i].updatePosition();
        }
    }

    static getPlayer(id) {
        return PLAYER_LIST[id];
    }

    static getPlayers() {
        return PLAYER_LIST;
    }

    static getInfo(socket) {
        var pack = [];
        var player = PLAYER_LIST[socket.id];
        pack.push(player.getData());

        for (var i in PLAYER_LIST) {
            var p = PLAYER_LIST[i];
            if (p.id != player.id) {
                if (player.getDistance(p) < 2000.0) {
                    pack.push(p.getData());
                }
            }
        }
        return pack;
    }
}
