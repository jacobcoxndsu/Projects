function Player(x, y, s, image) {
    this.x = x || 0;
    this.y = y || 0;
    this.size = s || 32;
    this.spriteBottom = new Sprite(image, 2, 0, 2, 2, 0);
    this.spriteMiddle = new Sprite(image, 4, 0, 2, 2, 0);
    this.spriteTop = new Sprite(image, 6, 0, 1, 2, 0);
    this.angle = 0;
}

Player.prototype.render = function (c, s) {
    this.spriteBottom.render(c, this.x, this.y, 0, s, 0);
    this.spriteMiddle.render(c, this.x, this.y, 0, s, 0);
    this.spriteTop.render(c, this.x, this.y, this.angle, s, 0);
}

Player.prototype.updateMousePosition = function (mx, my) {
    this.angle = Math.atan2(mx - this.x, -(my - this.y));
}

Player.prototype.update = function (data) {
    this.x = data.x;
    this.y = data.y;
    this.size = data.size;
}
