var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;

var cols, rows;
var w = 20;
cols = Math.floor(width / w);
rows = Math.floor(height / w);

var grid = [];
var stack = [];
var roomIds = [];

var map = undefined;

var current;

for(var j = 0; j < rows; j++){
    for( var i = 0; i < cols; i++){
        var cell = new Cell(i, j);
        grid.push(cell);
    }
    current = grid[0];
}

var r = Math.floor(Math.random()*256);
var g = Math.floor(Math.random()*256);
var b = Math.floor(Math.random()*256);
var color = 'rgb(' + r + ',' + g + ',' + b + ')';

var draw = function(){
    context.clearRect(0, 0, width, height);
    context.fillStyle = 'rgb(51, 51, 51)';
    context.fillRect(0, 0, width, height);

    for(var i = 0; i < grid.length; i++){
        grid[i].show(context);
    }

    if(current){
        current.visited = true;
        current.h = color;
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
    } else {
      //check to make sure the maze is complete

      var r = Math.floor(Math.random()*256);
      var g = Math.floor(Math.random()*256);
      var b = Math.floor(Math.random()*256);
      color = 'rgb(' + r + ',' + g + ',' + b + ')';
      var check = visited();
      if(check){
        current = check;
      } else {
        if(map){
          //display the map
          map.show();
        } else {
          map = new expansion();
        }
      }
    }

    window.requestAnimationFrame(draw);
}

function visited(){
  var v = undefined;
  for(var i = 0; i < grid.length; i++){
    if(!grid[i].visited){
      v = grid[i];
    }
  }
  return v;
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
            var neighbors = r.getNeighbors();
            var top = neighbors[0];
            var right = neighbors[1];
            var bottom = neighbors[2];
            var left = neighbors[3];

            r.h = 'white';

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

function createRooms(){
    var tries = 200;
    var maxSize = 7;
    var minSize = 3;
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
//createDoors();
