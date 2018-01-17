module.exports = class Vector2D {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    set(x, y) {
        this.x = x || this.x;
        this.y = y || this.y;
    }

    add(x, y) {
        this.x += x || 0;
        this.y += y || 0;
        return this;
    }

    sub(x, y) {
        this.x -= x || 0;
        this.y -= y || 0;
        return this;
    }

    scale(n) {
        this.x *= n || 1;
        this.y *= n || 1;
    }

    mag() {
        return Math.sqrt(this.magSq());
    }

    magSq() {
        return (this.x * this.x) + (this.y * this.y);
    }

    copy() {
        return new Vector2D(this.x, this.y);
    }

    toString() {
        return "Vector2D: [" + this.x + ", " + this.y + "]";
    }

    static dot(vector1, vector2) {
        if (vector1 instanceof Vector2D && vector2 instanceof Vector2D) {
            return vector1.x * vector2.x + vector1.y * vector2.y;
        }
    }
}
