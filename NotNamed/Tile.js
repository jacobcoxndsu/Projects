module.exports = class Tile {
    constructor(x, y, id, w, size) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.wall = w || false;
        this.size = size || 256;
        this.color = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
        this.walking = false;
        this.state = 100;
    }

    getData() {
        var pack = {
            x: this.x,
            y: this.y,
            size: this.size,
            color: this.color,
            wall: this.wall,
            walking: this.walking,
            state: this.state,
        }

        return pack;
    }
}
