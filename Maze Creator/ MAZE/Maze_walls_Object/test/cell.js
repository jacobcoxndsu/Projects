function Cell(i, j, x, y, w) {
    this.i = i;
    this.j = j;
    this.x = x;
    this.y = y;
    this.w = w;
    this.color = 'white';
    this.id = null;
    this.wall = false;
    this.trap = false;

    this.show = function(context){
        if(this.wall){
            context.fillStyle = 'black';
        } else if(this.trap){
          context.fillStyle = 'red';
        } else {
            context.fillStyle = this.color;
        }
        context.fillRect(this.x, this.y, this.w, this.w);
    }

    this.getNeighbors = function (grid, cols, rows) {
        var neighbors = [];
        var top = grid[index(this.i, this.j - 1, cols, rows)];
        var right = grid[index(this.i + 1, this.j, cols, rows)];
        var bottom = grid[index(this.i, this.j + 1, cols, rows)];
        var left = grid[index(this.i - 1, this.j, cols, rows)];

        //This will add them to the array no matter what, on purpose for collision...
        neighbors.push(top);
        neighbors.push(right);
        neighbors.push(bottom);
        neighbors.push(left);

        return neighbors;
    }
}
