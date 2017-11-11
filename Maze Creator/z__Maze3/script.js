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

var int = 1;

var current;

for(var j = 0; j < rows; j++){
    for( var i = 0; i < cols; i++){
        var cell = new Cell(i, j);
        grid.push(cell);
    }
    current = grid[0];
}

window.onload = function(){
    draw();
    init();
    //run();
}

function init(){
    createRooms();
    //createMaze();
    //clearOutRooms();
    //createDoors();
    
    current = grid[0];
}

var draw = function(){
    context.clearRect(0, 0, width, height);
    context.fillStyle = 'rgb(51, 51, 51)';
    context.fillRect(0, 0, width, height);
    
    for(var i = 0; i < grid.length; i++){
        grid[i].show(context);
    }
    
    /*
    */
    window.requestAnimationFrame(draw);
}

function index(i, j){
    if(i < 0 || j < 0 || i > cols-1 || j > rows-1){
        return -1;
    }
    return i+j*cols;
}

function clearOutRooms(){
    var i = 0;
    var interval = setInterval(function(){
        var r = grid[i];
        if(r.visited){
            var neighbors = r.getNeighbors();
            var top = neighbors[0];
            var right = neighbors[1];
            var bottom = neighbors[2];
            var left = neighbors[3];
            
            if(top && top.visited && (r.roomId === top.roomId) && r.roomId && top.roomId){
                removeWalls(r, top);
                r.h = 'white';
            }
            if(right && right.visited && (r.roomId === right.roomId) && r.roomId && right.roomId){
                removeWalls(r, right);
                r.h = 'white';
            }
            if(bottom && bottom.visited && (r.roomId === bottom.roomId) && r.roomId && bottom.roomId){
                removeWalls(r, bottom);
                r.h = 'white';
            }
            if(left && left.visited && (r.roomId === left.roomId) && r.roomId && left.roomId){
                removeWalls(r, left);
                r.h = 'white';
            }
        }
        
        i++;
        
        if(i >= grid.length){
            clearInterval(interval);
            interval = null;
            createDoors();
        }
    }, int);
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
    for(var i = 0; i < roomIds.length; i++){
        //pick out all squares in that room
        var c = [];
        for(var k = 0; k < grid.length; k++){
            if(grid[k].roomId === roomIds[i]){
                c.push(grid[k]);
            }
        }
        //get rid of all invalid possibilities
        var r = [];
        for(var k = 0; k < c.length; k++){
            var hasValidNeighbor = false;
            var neighbors = c[k].getNeighbors();
            for(var l = 0; l < neighbors.length; l++){
                if(!neighbors[l].roomId){
                    hasValidNeighbor = true;
                }
            }
            
            if(hasValidNeighbor){
                r.push(c[k]);
            }
        }
        
        //pick a random cell that will work as a valid door
        var rand = Math.floor(Math.random() * r.length);
        var u = r[rand];
        var notOpened = true;
        var neighbors = u.getNeighbors();
        for(var k = 0; k < neighbors.length; k++){
            if(notOpened && !neighbors[k].roomId){
                removeWalls(u, neighbors[k]);
                notOpened = false;
            }
        }
    }
}

function createMaze(){
    var interval = setInterval(function(){
        if(current){
            current.visited = true;
            current.highlight();
            var next = current.checkNeighborsNotVisited();
            if(next){
                next.visited = true;
                stack.push(current);
                removeWalls(current, next);
                current = next;
            } else {
                current = stack.pop();
            }
        }   
        
        var end = true;
        //for(var i = 0; i < grid.length; i++){
        //    if(grid[i].visited === false){
        //        end = false;
         //   }
        //}
        
        //if(end){
        //    clearInterval(interval);
        //    interval = null;
            clearOutRooms();
        //}
    }, int);
}

function createRooms(){
    var tries = 100;
    var maxSize = 8;
    var minSize = 4;
    var count = 0;

    var interval = setInterval(function(){
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
        
        
        if(count > tries){
            clearInterval(interval);
            interval = null;
            createMaze();
        }
    }, int);
}

createDoors();













