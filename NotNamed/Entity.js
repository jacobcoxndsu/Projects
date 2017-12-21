var Entity = function () {
	"use strict";
	var self = {
		x: 250,
		y: 250,
		spdX: 5,
		spdY: 5,
		id: "",
		displayDistance: 500
	};

	self.update = function () {
		//self.updatePosition();
	};

	self.updatePosition = function () {

	};

	self.getDistance = function (pt) {
		return Math.sqrt(Math.pow(self.x - pt.x, 2) + Math.pow(self.y - pt.y, 2));
	};

	return self;
};

module.exports = Entity;
