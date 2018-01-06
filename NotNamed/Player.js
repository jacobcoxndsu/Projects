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

		Log("Player", "Player Created with id: " + id, "info");
	}

	updatePosition() {
		//var map = Map.getMap();
		//for (var i = 0; i < map.length; i++) {
		//	map[i].walking = false;
		//}

		var centerX = this.x + (this.size / 2);
		var centerY = this.y + (this.size / 2);

		var topLeftX = this.x;
		var topLeftY = this.y;

		var topRightX = this.x + this.size;
		var topRightY = this.y;

		var bottomLeftX = this.x;
		var bottomLeftY = this.y + this.size;

		var bottomRightX = this.x + this.size;
		var bottomRightY = this.y + this.size;

		var centerTiles = Map.getAllTiles(centerX, centerY);
		var topLeftTiles = Map.getAllTiles(topLeftX, topLeftY);
		var topRightTiles = Map.getAllTiles(topRightX, topRightY);
		var bottomLeftTiles = Map.getAllTiles(bottomLeftX, bottomLeftY);
		var bottomRightTiles = Map.getAllTiles(bottomRightX, bottomRightY);

		var top = Map.getTileAbove(centerX, centerY);
		var bottom = Map.getTileBelow(centerX, centerY);
		var left = Map.getTileLeft(centerX, centerY);
		var right = Map.getTileRight(centerX, centerY);

		if (this.pressingUp && !this.pressingRight && !this.pressingLeft) {
			var a = topLeftTiles[0];
			var b = topRightTiles[0];
			if (a && b) {
				if (!a.wall && !b.wall) {
					for (var i = 0; i < this.spdY; i++) {
						this.y -= 1;
					}
				} else {
					for (var i = 0; i < this.spdY; i++) {
						if ((!Player.getCollisionTop(a, this)) && (!Player.getCollisionTop(b, this))) {
							this.y -= 1;
						}
					}
				}

				if (this.pressingSpace) {
					if (centerTiles[0]) {
						centerTiles[0].wall = false;
					}
				}
			} else {
				Log("Player", "Tile not Found", "error");
			}
		}

		if (this.pressingDown && !this.pressingRight && !this.pressingLeft) {
			var a = bottomLeftTiles[1];
			var b = bottomRightTiles[1];

			if (a && b) {
				if (!a.wall && !b.wall) {
					for (var i = 0; i < this.spdY; i++) {
						this.y += 1;
					}
				} else {
					for (var i = 0; i < this.spdY; i++) {
						if ((!Player.getCollisionBottom(a, this)) && (!Player.getCollisionBottom(b, this))) {
							this.y += 1;
						}
					}
				}

				if (this.pressingSpace) {
					if (centerTiles[1]) {
						centerTiles[1].wall = false;
					}
				}
			} else {
				Log("Player", "Tile not Found", "error");
			}
		}

		if (this.pressingRight && !this.pressingDown && !this.pressingUp) {
			var a = topRightTiles[3];
			var b = bottomRightTiles[3];

			if (a && b) {
				if (!a.wall && !b.wall) {
					for (var i = 0; i < this.spdX; i++) {
						this.x += 1;
					}
				} else {
					for (var i = 0; i < this.spdX; i++) {
						if ((!Player.getCollisionRight(a, this)) && (!Player.getCollisionRight(b, this))) {
							this.x += 1;
						}
					}
				}

				if (this.pressingSpace) {
					if (centerTiles[3]) {
						centerTiles[3].wall = false;
					}
				}
			} else {
				Log("Player", "Tile not Found", "error");
			}
		}

		if (this.pressingLeft && !this.pressingDown && !this.pressingUp) {
			var a = topRightTiles[2];
			var b = bottomRightTiles[2];

			if (a && b) {
				if (!a.wall && !b.wall) {
					for (var i = 0; i < this.spdX; i++) {
						this.x -= 1;
					}
				} else {
					for (var i = 0; i < this.spdX; i++) {
						if ((!Player.getCollisionLeft(a, this)) && (!Player.getCollisionLeft(b, this))) {
							this.x -= 1;
						}
					}
				}

				if (this.pressingSpace) {
					if (centerTiles[2]) {
						centerTiles[2].wall = false;
					}
				}
			} else {
				Log("Player", "Tile not Found", "error");
			}
		}

		var tile = Map.getTile(centerY, centerY);
		if (!tile) {
			Log("Player", "Tile not Found", "error");
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

	static getCollisionTop(rec, pla) {
		var y1 = rec.y + rec.size;
		var y2 = pla.y;
		return !(Math.abs(y1 - y2) > 1);
	}

	static getCollisionBottom(rec, pla) {
		var y1 = rec.y;
		var y2 = pla.y + pla.size;
		return !(Math.abs(y1 - y2) > 1);
	}

	static getCollisionRight(rec, pla) {
		var x1 = rec.x;
		var x2 = pla.x + pla.size;
		return !(Math.abs(x1 - x2) > 1);
	}

	static getCollisionLeft(rec, pla) {
		var x1 = rec.x + rec.size;
		var x2 = pla.x;
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
