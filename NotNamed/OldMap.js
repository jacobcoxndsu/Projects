var Blocks = require('./Blocks');
var Player = require('./Player');

var Map = function () {
	var self = {
		width: 500,
		height: 500,
		blockSize: 128,
		id: 0
	}

	self.create = function () {
		var x = 0;
		for (var i = 0; i < self.width; i++) {
			for (var j = 0; j < self.height; j++) {
				var cell = new Blocks(i * self.blockSize, j * self.blockSize, x, self.blockSize);
				Map.blocks.push(cell);
				x++;
			}
		}

		console.log("Map Created, ID: " + self.id + " Map size: " + Map.blocks.length);
	}

	/*self.getData = function(){
		var pack = {
			
		}
	}*/

	return self;
}

Map.blocks = [];
Map.map = null;

Map.create = function () {
	Map.map = new Map();
	Map.map.create();
}

Map.getBlocks = function (player, radius) {
	var pack = [];

	var x = player.x;
	var y = player.y;

	for (var i = 0; i < Map.blocks.length; i++) {
		var block = Map.blocks[i];
		var distance = Math.pow(x - block.x, 2) + Math.pow(y - block.y, 2);
		if (distance < Math.pow(radius, 2)) {
			pack.push(block.getData());
		}
	}
	//console.log(pack);
	return pack;
}

Map.getInfo = function (socket) {
	var player = Player.list[socket.id];
	var pack = Map.getBlocks(player, 2000);
	return pack;
}

Map.update = function () {

}

module.exports = Map;
