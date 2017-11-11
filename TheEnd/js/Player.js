function Player(maze) {
    this.x = 200;
    this.y = 200;
    this.pressingRight = false;
    this.pressingLeft = false;
    this.pressingUp = false;
    this.pressingDown = false;
    this.speed = 15;
    this.radius = 70;
    this.color = 'white';
    this.roomId = undefined;
    
    var check = true;
    for(var i = 0; i < maze.grid.length; i++){
        var chunk = maze.grid[i];
        if(chunk.roomId && check){
            this.x = chunk.i * chunk.size + (chunk.size / 2);
            this.y = chunk.j * chunk.size + (chunk.size / 2);
            check = false;
            this.roomId = chunk.roomId;
        }
    }

    this.show = function (context) {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fill();
        context.strokeWidth = 7;
        context.stroke();
    }

    this.updatePosition = function (maze) {
        var chunk = maze.getChunk(this.x, this.y);
        
        if(chunk.roomId){
            if(chunk.roomId != this.roomId){
                var win = confirm("You Found The End!");
                if(win){
                    location.reload();
                }
            }
        }
        
        var cell = chunk.getCell(this.x, this.y);
        cell.color = this.color;
        var neighbors = cell.getNeighbors(chunk.cells, chunk.n, chunk.n);

        if (this.pressingUp) {
            var n = neighbors[0];
            if (n && n.wall) {
                for (var i = 0; i < this.speed; i++) {
                    if (!this.colission(n.x, n.y, n.w, n.w)) {
                        this.y -= 1;
                    }
                }
            } else {
                for (var i = 0; i < this.speed; i++) {
                    this.y -= 1;
                }
            }
        }

        if (this.pressingRight) {
            var n = neighbors[1];
            if (n && n.wall) {
                for (var i = 0; i < this.speed; i++) {
                    if (!this.colission(n.x, n.y, n.w, n.w)) {
                        this.x += 1;
                    }
                }
            } else {
                for (var i = 0; i < this.speed; i++) {
                    this.x += 1;
                }
            }
        }

        if (this.pressingDown) {
            var n = neighbors[2];
            if (n && n.wall) {
                for (var i = 0; i < this.speed; i++) {
                    if (!this.colission(n.x, n.y, n.w, n.w)) {
                        this.y += 1;
                    }
                }
            } else {
                for (var i = 0; i < this.speed; i++) {
                    this.y += 1;
                }
            }
        }

        if (this.pressingLeft) {
            var n = neighbors[3];
            if (n && n.wall) {
                for (var i = 0; i < this.speed; i++) {
                    if (!this.colission(n.x, n.y, n.w, n.w)) {
                        this.x -= 1;
                    }
                }
            } else {
                for (var i = 0; i < this.speed; i++) {
                    this.x -= 1;
                }
            }
        }
    }
    
    //this needs to be worked on not even close to being finished...
    this.getCuurentChunk = function(grid, cols){
        for(var i = 0; i < grid.length; i++){
            var chunk = grid[i];
            if(chunk){
                var x = chunk.i % cols;
                var y = chunk.i / width;
            }
        }
    }

    this.colission = function (rectX, rectY, rectWidth, rectHeight) {
        var deltaX = this.x - Math.max(rectX, Math.min(this.x, rectX + rectWidth));
        var deltaY = this.y - Math.max(rectY, Math.min(this.y, rectY + rectHeight));
        return (deltaX * deltaX + deltaY * deltaY) < (this.radius * this.radius);
    }
}
