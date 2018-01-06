module.exports = class Entity {
	constructor(id, x, y, spdX, spdY) {
		this.x = x || 1000;
		this.y = y || 1000;
		this.spdX = spdX || 20;
		this.spdY = spdY || 20;
		this.id = id || 0;
		this.size = 64;
	}

	update() {
		this.updatePosition();
	}

	updatePosition() {

	}

	getDistance(pt) {
		return Math.sqrt(Math.pow(this.x - pt.x, 2) + Math.pow(this.y - pt.y, 2));
	}
}
