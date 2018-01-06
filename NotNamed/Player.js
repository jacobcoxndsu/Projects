const Entity = require('./Entity.js');
const Map = require('./Map.js');
var Log = require('./Log.js');

var PLAYER_LIST = {};

module.exports = class Player extends Entity {
	constructor(id, x, y) {
		super(id, x, y);
		this.pressingRight = false;
		this.pressingLeft = false;
		this.pressingUp = false;
		this.pressingDown = false;
		this.pressingSpace = false;
		this.map = null;

		PLAYER_LIST[id] = this;

		console.log(PLAYER_LIST);
		Log("Player", "Player Created with id: " + id, "info");
	}

	updatePosition() {
		var centerX = this.x + (this.size / 2);
		var centerY = this.y + (this.size / 2);

		var top = Map.getTileAbove(centerX, centerY);
		var bottom = Map.getTileBelow(centerX, centerY);
		var left = Map.getTileLeft(centerX, centerY);
		var right = Map.getTileRight(centerX, centerY);

		var tile = Map.getTile(centerY, centerY);

		if (this.pressingUp) {
			if (top) {
				if (!top.wall) {
					for (var i = 0; i < this.spdY; i++) {
						this.y -= 1;
					}
				} else {
					for (var i = 0; i < this.spdY; i++) {
						if (!Player.getCollisionTop(top, this)) {
							this.y -= 1;
						}
					}
				}

				if (this.pressingSpace) {
					top.wall = false;
				}
			}
		}

		if (this.pressingDown) {
			if (bottom) {
				if (!bottom.wall) {
					for (var i = 0; i < this.spdY; i++) {
						this.y += 1;
					}
				} else {
					for (var i = 0; i < this.spdY; i++) {
						if (!Player.getCollisionBottom(bottom, this)) {
							this.y += 1;
						}
					}
				}

				if (this.pressingSpace) {
					bottom.wall = false;
				}
			}
		}

		if (this.pressingLeft) {
			if (left) {
				if (!left.wall) {
					for (var i = 0; i < this.spdX; i++) {
						this.x -= 1;
					}
				} else {
					for (var i = 0; i < this.spdX; i++) {
						if (!Player.getCollisionLeft(left, this)) {
							this.x -= 1;
						}
					}
				}

				if (this.pressingSpace) {
					left.wall = false;
				}
			}
		}

		if (this.pressingRight) {
			if (right) {
				if (!right.wall) {
					for (var i = 0; i < this.spdX; i++) {
						this.x += 1;
					}
				} else {
					for (var i = 0; i < this.spdX; i++) {
						if (!Player.getCollisionRight(right, this)) {
							this.x += 1;
						}
					}
				}

				if (this.pressingSpace) {
					right.wall = false;
				}
			}
		}
	}

	getData() {
		var pack = {
			id: this.id,
			x: this.x,
			y: this.y,
			size: this.size
		}

		return pack;
	}

	static getMapInfo(socket) {
		var player = PLAYER_LIST[socket.id];
		var pack = Map.getInfo(player);
		return pack;
	}

	static getCollisionTop(rec1, rec2) {
		var y1 = rec1.y + rec1.size;
		var y2 = rec2.y;

		return !(Math.abs(y1 - y2) > 1);
	}

	static getCollisionBottom(rec1, rec2) {
		var y1 = rec1.y;
		var y2 = rec2.y + rec2.size;

		return !(Math.abs(y1 - y2) > 1);
	}

	static getCollisionRight(rec1, rec2) {
		var x1 = rec1.x;
		var x2 = rec2.x + rec2.size;

		return !(Math.abs(x1 - x2) > 1);
	}

	static getCollisionLeft(rec1, rec2) {
		var x1 = rec1.x + rec1.size;
		var x2 = rec2.x;

		return !(Math.abs(x1 - x2) > 1);
	}

	static onConnect(socket) {
		var player = new Player(socket.id, 1000, 1000);

		socket.on('keyPress', function (data) {
			if (data.inputId === 'left') {
				player.pressingLeft = data.state;
				//player.pressingRight = false;
				//player.pressingDown = false;
				//player.pressingUp = false;
			} else if (data.inputId === 'right') {
				player.pressingRight = data.state;
				//player.pressingLeft = false;
				//player.pressingDown = false;
				//player.pressingUp = false;
			} else if (data.inputId === 'up') {
				player.pressingUp = data.state;
				//player.pressingLeft = false;
				//player.pressingRight = false;
				//player.pressingDown = false;
			} else if (data.inputId === 'down') {
				player.pressingDown = data.state;
				//player.pressingLeft = false;
				//player.pressingRight = false;
				//player.pressingUp = false;
			} else if (data.inputId === 'space') {
				player.pressingSpace = data.state;
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
