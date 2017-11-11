var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;

var cols, rows;
var w = 25;
cols = Math.floor(width / w);
rows = Math.floor(height / w);

var grid = [];
var stack = [];
var roomIds = [];

var current;

function Cell(i, j){
    this.i = i;
    this.j = j;
    //top right bottom left
    this.walls = [true, true, true, true];
    this.visited = false;
    this.h = 'rgba(255, 0, 255, .5)';
    this.roomId = undefined;
    
    this.highlight = function(h){
        var x = this.i * w;
        var y = this.j * w;
        if(h){
            context.fillStyle = h;
        } else {
            context.fillStyle = 'rgba(0, 0, 255, .5)';
        }
        context.fillRect(x, y, w, w);
    }
    
    this.show = function(context){
        var x = this.i * w;
        var y = this.j * w;
        context.strokeStyle = 'white';
        
        if(this.walls[0]){
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x+w, y);
            context.stroke();
        }
        if(this.walls[1]){
            context.beginPath();
            context.moveTo(x+w, y);
            context.lineTo(x+w, y+w);
            context.stroke();
        }
        if(this.walls[2]){
            context.beginPath();
            context.moveTo(x+w, y+w);
            context.lineTo(x, y+w);
            context.stroke();
        }
        if(this.walls[3]){
            context.beginPath();
            context.moveTo(x, y+w);
            context.lineTo(x, y);
            context.stroke();
        }
        
        if(this.visited){
            context.fillStyle = this.h;
            context.fillRect(x, y, w, w);
        }
    }
    
    this.checkNeighbors = function(){
        var neighbors = [];
        
        var top = grid[index(i, j - 1)];
        var right = grid[index(i+1, j)];
        var bottom = grid[index(i, j+1)];
        var left = grid[index(i-1, j)];
        
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
}

for(var j = 0; j < rows; j++){
    for( var i = 0; i < cols; i++){
        var cell = new Cell(i, j);
        grid.push(cell);
    }
    current = grid[0];
}

setInterval = function(){
    context.clearRect(0, 0, width, height);
    context.fillStyle = 'rgb(51, 51, 51)';
    context.fillRect(0, 0, width, height);
    
    for(var i = 0; i < grid.length; i++){
        grid[i].show(context);
    }
    
    if(current){
        current.visited = true;
        current.highlight();
        var next = current.checkNeighbors();
        if(next){
            next.visited = true;
            stack.push(current);
            removeWalls(current, next);
            current = next;
        } else {
            current = stack.pop();
        }
    }
}

var draw = function(){
    context.clearRect(0, 0, width, height);
    context.fillStyle = 'rgb(51, 51, 51)';
    context.fillRect(0, 0, width, height);
    
    for(var i = 0; i < grid.length; i++){
        grid[i].show(context);
    }
    
    if(current){
        current.visited = true;
        current.highlight();
        var next = current.checkNeighbors();
        if(next){
            next.visited = true;
            stack.push(current);
            removeWalls(current, next);
            current = next;
        } else {
            current = stack.pop();
        }
    }   
    
    window.requestAnimationFrame(draw);
}

function index(i, j){
    if(i < 0 || j < 0 || i > cols-1 || j > rows-1){
        return -1;
    }
    return i+j*cols;
}

function clearOutRooms(){
    for(var i = 0; i < grid.length; i++){
        var r = grid[i];
        if(r.visited){
            var top = grid[index(r.i, r.j - 1)];
            var right = grid[index(r.i+1, r.j)];
            var bottom = grid[index(r.i, r.j+1)];
            var left = grid[index(r.i-1, r.j)];
            
            if(top && top.visited && (r.roomId == top.roomId)){
                removeWalls(r, top);
            }
            if(right && right.visited && (r.roomId == right.roomId)){
                removeWalls(r, right);
            }
            if(bottom && bottom.visited && (r.roomId == bottom.roomId)){
                removeWalls(r, bottom);
            }
            if(left && left.visited && (r.roomId == left.roomId)){
                removeWalls(r, left);
            }
        }
    }
}

function removeWalls(a, b){
    var x = a.i - b.i;
    if(x === 1){
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1){
        a.walls[1] = false;
        b.walls[3] = false;
    }
    var y = a.j - b.j;
    if(y === 1){
        a.walls[0] = false;
        b.walls[2] = false;
    } else if(y === -1){
        a.walls[2] = false;
        b.walls[0] = false;
    }
}

function createDoors(){
    
}

function createRooms(){
    var tries = 100;
    var maxSize = 9;
    var minSize = 4;
    var count = 0;

    while (count < tries){
        var placed = false;

        //create random room
        var x = Math.floor(Math.random() * cols);
        var y = Math.floor(Math.random() * rows);
        var width = Math.floor((Math.random() * (maxSize - minSize)) + minSize);
        var height = Math.floor((Math.random() * (maxSize - minSize)) + minSize);

        if(x + width < cols && y + height < rows){
            var valid = true;
            for(var i = 0; i < width; i++){
                for(var j = 0; j < height; j++){
                    if(grid[index(x + i, y + j)].visited === true){
                        valid = false;
                    }
                }
            }


            if(valid){
                //pick a random color blue for the room
                var r = 0;
                var g = Math.floor(Math.random() * 256 + 50);
                var b = Math.floor(Math.random()*256 + 50);
                var rgb = 'rgb(' + r + ',' + g + ',' + b + ')';

                //pick a random color for the room
                //var r = Math.floor(Math.random()*256);
                //var g = Math.floor(Math.random()*256);
                //var b = Math.floor(Math.random()*256);
                //var rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
                var id = Math.random();
                roomIds.push(id);
                //If it is a valid place, change its color and mark it as selected to be a room.
                for(var i = 0; i < width; i++){
                    for(var j = 0; j < height; j++){
                        //cells[index(x + i, y + j)].room = true;
                        grid[index(x + i, y + j)].visited = true;
                        grid[index(x + i, y + j)].h = rgb;
                        //grid[index(x + i, y + j)].h = ('rgba(0, 255, 255, .5)');
                        grid[index(x + i, y + j)].roomId = id;
                        //cells[index(x + i, y + j)].BC = rgb;
                    }
                }
                placed = true;
            }
        }

        if(placed === false){
            count++;
        }
    }
}

draw();
createRooms();
clearOutRooms();
createDoors();













