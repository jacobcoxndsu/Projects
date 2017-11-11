var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
//var width = canvas.width = context.width = window.innerWidth;
//var height = canvas.height  = context.height = window.innerHeight;

var width = canvas.width = context.width = 800;
var height = canvas.height = context.height = 800;

var size = 16;

var cols = width / size;
var rows = height / size;
var current;

var cells = [];
var stack = [];

//create the cells
for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
        var cell = new Cell(i * size, j * size, size, size, i, j);
        cells.push(cell);
    }
}

//create the rooms
createRooms();

//grab a random not already selected to be a room square
/*for(var i = 0; i < cells.length; i++){
    if(!current){
        current = cells[i];
    }
    if(current && current.visited){
        current = cells[i];
    }
}*/

current = cells[0];

function createRooms(){
    var tries = 50;
    var maxSize = 11;
    var minSize = 5;
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
                    if(cells[index(x + i, y + j)].room === true){
                        valid = false;
                    }
                }
            }


            if(valid){
                /*
                //pick a random color blue for the room
                var r = 0;
                var g = Math.floor(Math.random() * 256 + 50);
                var b = Math.floor(Math.random()*256 + 50);
                var rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
                */

                //pick a random color for the room
                var r = Math.floor(Math.random()*256);
                var g = Math.floor(Math.random()*256);
                var b = Math.floor(Math.random()*256);
                var rgb = 'rgb(' + r + ',' + g + ',' + b + ')';

                //If it is a valid place, change its color and mark it as selected to be a room.
                for(var i = 0; i < width; i++){
                    for(var j = 0; j < height; j++){
                        cells[index(x + i, y + j)].room = true;
                        cells[index(x + i, y + j)].visited = true;
                        cells[index(x + i, y + j)].BC = rgb;
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

var draw = function(){
    //clear the canvas
    context.clearRect(0, 0, width, height);

    //draw the background
    //context.fillStyle = 'gray';
    //context.fillRect(0, 0, width, height);

    //draw the cells
    for(var i = 0; i < cells.length; i++){
        cells[i].draw(context);
    }
    
    if(current){
        current.visited = true;
        //current.highlight();
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

    //redraw
    window.requestAnimationFrame(draw);
}

 draw();

function index(x, y){
    if (x < 0 || y < 0 || x > cols-1 || y > rows-1) {
        return -1;
    }
    return x + y * cols;
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