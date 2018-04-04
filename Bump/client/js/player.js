var size = 16;
var rows = 12;
var cols = 8;

function Player(x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.size = 10;
    this.mouseX = 0;
    this.mouseY = 0;

    var f = [{
        x: 6 * size,
        y: 0 * size,
        sx: size * 2,
        sy: size * 2,
    }];
    //var baseSprite = new Sprite(f);

    /*
    f = [{
        x: 4 * size,
        y: 0 * size,
        sx: size * 2,
        sy: size * 2,
    }];
    var middleSprite = new Sprite(f);

    f = [{
        x: 6 * size,
        y: 0 * size,
        sx: size * 2,
        sy: size * 2,
    }];
    var gunSprite = new Sprite(f);
    */

    this.render = function (c, image) {
        c.save();
        //c.translate(this.x, this.y);
        c.translate(this.x + 16, this.y + 32);
        //console.log(Math.atan2(mouseX - this.x, mouseY - this.y));
        c.rotate(Math.atan2(mouseX - this.x, mouseY - this.y));
        c.scale(scale, scale);
        //console.log(this.x + ", " + this.y);
        //baseSprite.render(c, this.x, this.y, size, scale, image, false);
        //middleSprite.render(c, this.x, this.y, size, scale, image, false);

        c.drawImage(image, 6 * size, 0 * size, 32, 32, this.x, this.y, 32, 32);

        //gunSprite.render(c, this.x, this.y, size, scale, image, true);



        //c.fillStyle = "red";
        //c.fillRect(this.x, this.y, 3, 3);
        //c.fillStyle = "black";

        c.restore();
    }

    this.update = function (x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;

        //baseSprite.update();
        //middleSprite.update();
        //gunSprite.update();
    }
}
