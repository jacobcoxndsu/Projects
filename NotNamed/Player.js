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
		this.map = null;

		PLAYER_LIST[id] = this;
		Log("Player", "Player Created with id: " + id, "info");
	}

	updatePosition() {
		var map = Map.getMap();
		for (var i = 0; i < map.length; i++) {
			map[i].walking = false;
		}

		var top = Map.getTileAbove(this.x, this.y);
		var bottom = Map.getTileBelow(this.x, this.y);
		var left = Map.getTileLeft(this.x, this.y);
		var right = Map.getTileRight(this.x, this.y);

		var tile = Map.getTile(this.x, this.y);
		tile.walking = true;


		if (this.pressingUp) {
			if (top) {
				top.walking = true;
				for (var i = 0; i < this.spdY; i++) {
					if (!Player.collision(tile)) {
						this.y -= 1;

					}
				}
			}
		}

		if (this.pressingDown) {
			if (bottom) {
				bottom.walking = true;
				for (var i = 0; i < this.spdY; i++) {
					if (!Player.collision(tile)) {
						this.y += 1;

					}
				}
			}
		}

		if (this.pressingLeft) {
			if (left) {
				left.walking = true;
				for (var i = 0; i < this.spdX; i++) {
					if (!Player.collision(tile)) {
						this.x -= 1;

					}
				}
			}
		}

		if (this.pressingRight) {
			if (right) {
				right.walking = true;
				for (var i = 0; i < this.spdX; i++) {
					if (!Player.collision(tile)) {
						this.x += 1;

					}
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

	static collision(tile) {
		//var deltaX = this.x - Math.max(tile.x, Math.min(this.x, tile.x + tile.size));
		//var deltaY = this.y - Math.max(tile.y, Math.min(this.y, tile.y + tile.size));
		if (tile.wall) {
			if (tile.x < this.x + this.size && tile.x + tile.size > this.x && tile.y < this.y + this.size && tile.size + tile.y > this.y) {
				return true;
			}
		}

		//return false;
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
				if (player.getDistance(p) < 1000.0) {
					pack.push(player.getData());
				}
			}
		}
		return pack;
	}
}
