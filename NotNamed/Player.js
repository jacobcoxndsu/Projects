const Entity = require('./Entity');
var Log = require('./Log');

var PLAYER_LIST = {};

module.exports = class Player extends Entity {
	constructor(id, x, y) {
		super(id, x, y);
		this.pressingRight = false;
		this.pressingLeft = false;
		this.pressingUp = false;
		this.pressingDown = false;

		PLAYER_LIST[id] = this;
		Log("Player", "Player Created with id: " + id, "info");
	}

	updatePosition() {
		if (this.pressingUp) {
			for (var i = 0; i < this.spdY; i++) {
				this.y -= 1;
			}
		}

		if (this.pressingDown) {
			for (var i = 0; i < this.spdX; i++) {
				this.y += 1;
			}
		}

		if (this.pressingLeft) {
			for (var i = 0; i < this.spdY; i++) {
				this.x -= 1;
			}
		}

		if (this.pressingRight) {
			for (var i = 0; i < this.spdX; i++) {
				this.x += 1;
			}
		}
	}

	getData() {
		var pack = {
			id: this.id,
			x: this.x,
			y: this.y
		}

		return pack;
	}

	static onConnect(socket) {
		var player = new Player(socket.id, 250, 250);

		socket.on('keyPress', function (data) {
			if (data.inputId === 'left') {
				player.pressingLeft = data.state;
				//player.pressingRight = false;
			} else if (data.inputId === 'right') {
				//player.pressingLeft = false;
				player.pressingRight = data.state;
			} else if (data.inputId === 'up') {
				//player.pressingDown = false;
				player.pressingUp = data.state;
			} else if (data.inputId === 'down') {
				player.pressingDown = data.state;
				//player.pressingUp = false;
			}
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

	static getInfo(socket) {
		var pack = [];
		var player = PLAYER_LIST[socket.id];
		pack.push({
			x: player.x,
			y: player.y,
			id: player.id
		});

		for (var i in PLAYER_LIST) {
			var p = PLAYER_LIST[i];
			if (p.id != player.id) {
				if (player.getDistance(p) < 500.0) {
					pack.push({
						x: p.x,
						y: p.y,
						id: p.id
					});
				}
			}
		}
		return pack;
	}
}
