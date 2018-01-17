const Vector2D = require('./Vector2D.js');

module.exports = class Entity extends Vector2D {
    constructor(id, x, y, spdX, spdY) {
        super(x, y);
        this.spd = 20;
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
