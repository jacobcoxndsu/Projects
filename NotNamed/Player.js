var Entity = require('./Entity');

var Player = function (id) {
	var self = Entity();
	self.id = id;
	self.pressingRight = false;
	self.pressingLeft = false;
	self.pressingUp = false;
	self.pressingDown = false;

	//Grab and call the super update function.
	var super_update = self.update;
	self.update = function () {
		self.updatePosition();
		super_update();
	}

	self.updatePosition = function () {
		if (self.pressingUp) {
			for (var i = 0; i < self.spdY; i++) {
				self.y -= 1;
			}
		}

		if (self.pressingDown) {
			for (var i = 0; i < self.spdX; i++) {
				self.y += 1;
			}
		}

		if (self.pressingLeft) {
			for (var i = 0; i < self.spdY; i++) {
				self.x -= 1;
			}
		}

		if (self.pressingRight) {
			for (var i = 0; i < self.spdX; i++) {
				self.x += 1;
			}
		}
	}

	self.getData = function () {
		var r = {
			id: self.id,
			x: self.x,
			y: self.y,
		}
		return r;
	}

	Player.list[id] = self;
	console.log("Player created, ID: " + self.id);
	return self;
}

Player.list = {};

Player.getInfo = function (socket) {
	var pack = [];
	var player = Player.list[socket.id];
	pack.push({
		x: player.x,
		y: player.y,
		id: player.id
	});

	for (var i in Player.list) {
		var p = Player.list[i];
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

Player.update = function () {
	for (var i in Player.list) {
		Player.list[i].update();
	}
}

Player.onConnect = function (socket) {

	var player = Player(socket.id);

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

Player.onDisconnect = function (socket) {
	delete Player.list[socket.id];
	console.log("Player deleted, ID: " + socket.id);
}

module.exports = Player;
