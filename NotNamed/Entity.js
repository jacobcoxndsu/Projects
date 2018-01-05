module.exports = class Entity {
	constructor(id, x, y, spdX, spdY) {
		this.x = x || 250;
		this.y = y || 250;
		this.spdX = spdX || 25;
		this.spdY = spdY || 25;
		this.id = id || 0;
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
