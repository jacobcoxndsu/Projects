const Tile = require('./Tile');
const Util = require('./Util');
const Player = require('./Player');
var Log = require("./Log");

//ALL CAPS is used to denote the class variables or constants, this is a static class... ;)
var MAP = [];
var MAP_SIZE = 400;
var TILE_SIZE = 64;
var CHANCE_TO_STAY_ALIVE = 0.45;
var BIRTH_LIMIT = 4;
var DEATH_LIMIT = 2;
var NUMBER_OF_STEPS = 3;

module.exports = class Map {
	static create(chance, birth, death) {
		Map.initialize();
		for (var i = 0; i < NUMBER_OF_STEPS; i++) {
			Map.step(i);
		}
		Map.fillWalls();
		Log("Map", "Map creation Complete", "finish");
	}

	static initialize() {
		for (var x = 0; x < MAP_SIZE; x++) {
			for (var y = 0; y < MAP_SIZE; y++) {
				var id = Util.getRandomId();
				var value = false;

				if (Math.random() < CHANCE_TO_STAY_ALIVE) {
					value = true;
				}

				var tile = new Tile(x * TILE_SIZE, y * TILE_SIZE, id, value, TILE_SIZE);
				MAP[x * MAP_SIZE + y] = tile;
			}
		}
		Log("Map", "Initialization Complete", "finish");
	}

	static step(num) {
		//Create a new temp map
		var newMap = [];
		for (var x = 0; x < MAP_SIZE; x++) {
			for (var y = 0; y < MAP_SIZE; y++) {
				var id = MAP[x * MAP_SIZE + y].id;
				var tile = new Tile(x * TILE_SIZE, y * TILE_SIZE, id, false, TILE_SIZE);
				newMap[x * MAP_SIZE + y] = tile;
			}
		}

		//now edit newMap based on the MAP object
		for (var x = 0; x < MAP_SIZE; x++) {
			for (var y = 0; y < MAP_SIZE; y++) {
				var nbs = Map.countAliveNeighbors(x, y);

				if (MAP[x * MAP_SIZE + y].wall === true) {
					if (nbs < DEATH_LIMIT) {
						newMap[x * MAP_SIZE + y].wall = false;
					} else {
						newMap[x * MAP_SIZE + y].wall = true;
					}
				} else {
					if (nbs > BIRTH_LIMIT) {
						newMap[x * MAP_SIZE + y].wall = true;
					} else {
						newMap[x * MAP_SIZE + y].wall = false;
					}
				}
			}
		}

		MAP = newMap;
		Log("Map", "Step Number " + num, "finish");
		if (num === NUMBER_OF_STEPS - 1) {
			Log("Map", "Steps Complete", "finish");
		}
	}

	static fillWalls() {
		for (var i = 0; i < MAP_SIZE; i++) {
			for (var j = 0; j < MAP_SIZE; j++) {
				if (i === 0 || j === 0 || i === MAP_SIZE - 1 || j === MAP_SIZE -
					1) {
					MAP[i * MAP_SIZE + j].wall = true;
				}
			}
		}

		Log("Map", "Filled Walls Complete", "finish");
	}

	static countAliveNeighbors(x, y) {
		var count = 0;
		for (var i = -1; i < 2; i++) {
			for (var j = -1; j < 2; j++) {
				var neighbor_x = x + i;
				var neighbor_y = y + j;
				if (i === 0 && j === 0) {
					//Do nothing we are looking at ourself
				} else if (neighbor_x < 0 || neighbor_y < 0 || neighbor_x >= MAP_SIZE || neighbor_y >= MAP_SIZE) {
					count = count + 1;
				} else if (MAP[neighbor_x * MAP_SIZE + neighbor_y].wall === true) {
					count = count + 1;
				}
			}
		}

		return count;
	}

	static getInfo(socket) {
		var player = Player.getPlayer(socket.id);
		var pack = Map.getTiles(player, TILE_SIZE * 50);
		return pack;
	}

	static getTiles(player, radius) {
		var pack = [];

		var x = player.x;
		var y = player.y;

		for (var i = 0; i < MAP.length; i++) {
			var tile = MAP[i];
			var distance = Math.pow(x - tile.x, 2) + Math.pow(y - tile.y, 2);
			if (distance < Math.pow(radius, 2)) {
				pack.push(tile.getData());
			}
		}
		return pack;
	}

	static getMap() {
		return MAP;
	}

	static getMapSize() {
		return MAP_SIZE;
	}
}
