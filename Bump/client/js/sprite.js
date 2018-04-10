function Sprite(image, sx, sy, ex, ey, f) {
    this.image = image;
    this.startX = sx * 16;
    this.startY = sy * 16;
    this.endX = this.startX + ex * 16;
    this.endY = this.startY + ey * 16;
    this.frameCount = f || 0;
    this.frame = 0;
    if (this.frameCount != 0) {
        this.frameWidth = (this.endX - this.startX) / this.frameCount;
    } else {
        this.frameWidth = this.endX - this.startX;
    }
    this.frameHeight = this.endY - this.startY;
}

Sprite.prototype = {
    render: function (c, x, y, r, s, f) {

        r = r || 0;

        if (this.image && this.image.loaded) {
            c.save();
            var frameX = this.startX + (this.frameWidth * f);
            var frameY = this.startY;
            var scaledFrameWidth = this.frameWidth * s;
            var scaledFrameHeight = this.frameHeight * s;
            c.translate(x, y);
            //c.translate(scaledFrameWidth/2, scaledFrameHeight/2);
            c.rotate(r);
            c.drawImage(this.image, frameX, frameY, this.frameWidth, this.frameHeight, -(scaledFrameWidth / 2), -(scaledFrameHeight / 2), scaledFrameWidth, scaledFrameHeight);
            c.restore();
        }
    }
}
