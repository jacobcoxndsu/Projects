var Blocks = function (x, y, id, size) {
	"use strict";
	var self = {
		x: x,
		y: y,
		id: id,
		size: size,
		color: 'hsl(' + 360 * Math.random() + ', 50%, 50%)',
		ore: Math.random() * 100
	}

	self.getData = function () {
		var pack = {
			x: self.x,
			y: self.y,
			size: self.size,
			id: self.id,
			color: self.color,
			ore: self.ore
		}

		return pack;
	}

	return self;
}

module.exports = Blocks;
