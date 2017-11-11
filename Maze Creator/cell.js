function Cell(x, y, w, h, i, j){
    this.i = i;
    this.j = j;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.BC = 'rgb(158, 162, 168)';
    this.walls = [true, true, true, true];
    this.room = false;
    this.visited = false;
    
    this.draw = function(context){
        context.fillStyle = this.BC;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.strokeStyle = 'black';
        //context.strokeRect(this.x, this.y, this.width, this.height);
        
        
        var x = this.x;
        var y = this.y;
        var w = this.width;
        if (this.walls[0]) {
            this.line(context, x, y, x + w, y);
        }
        if (this.walls[1]) {
            this.line(context, x + w, y, x + w, y + w);
        }
        if (this.walls[2]) {
            this.line(context, x + w, y + w, x, y + w);
        }
        if (this.walls[3]) {
            this.line(context, x, y + w, x, y);
        }
    }
    
    this.checkNeighbors = function(){
        var neighbors = [];
        
        var top = cells[index(i, j - 1)];
        var right = cells[index(i+1, j)];
        var bottom = cells[index(i, j+1)];
        var left = cells[index(i-1, j)];
        
        if(top && !top.visited){
            neighbors.push(top);
        }
        if(right && !right.visited){
            neighbors.push(right);
        }
        if(bottom && !bottom.visited){
            neighbors.push(bottom);
        }
        if(left && !left.visited){
            neighbors.push(left);
        }
        
        if(neighbors.length > 0){
            var r = Math.floor(Math.random() * neighbors.length);
            return neighbors[r];
        } else{
             return undefined;
        }
    }
    
    this.line = function(context, a, b, c, d){
        context.beginPath();
        context.moveTo(a, b);
        context.lineTo(c, d);
        context.stroke();
    }
}