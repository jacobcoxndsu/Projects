function Sprite(frames) {
    this.frames = frames;
    this.time = timestamp();
    this.frameCount = 0;


    this.render = function (c, cx, cy, size, scale, image, rotate) {
        //c.save();

        var x = frames[this.frameCount].x;
        var y = frames[this.frameCount].y;
        var sx = frames[this.frameCount].sx;
        var sy = frames[this.frameCount].sy;

        var rx = cx - (size * scale);
        var ry = cy - (size * scale);

        //c.setTransform(sx * scale, 0, 0, sy * scale, 0, 0);

        if (rotate) {
            //c.translate(cx, cy);
            //c.translate(rx, ry);

            c.drawImage(image, x, y, sx, sy, cx, cy, 32, 32);
        } else {
            //c.scale(scale, scale);
            //c.drawImage(image, x, y, sx, sy, rx, ry, 32, 32);
        }

        //c.restore();
    }

    this.update = function () {
        t = timestamp();
        if (t - this.time > 200) {
            if (frames.length > 1) {
                this.frameCount++;
            }

            if (this.frameCount > frames.length - 1) {
                this.frameCount = 0;
            }
            this.time = timestamp();
        }

    }
}
