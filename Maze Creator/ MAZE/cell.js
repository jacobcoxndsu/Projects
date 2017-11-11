function Cell(i, j){
    this.i = i;
    this.j = j;
    //top right bottom left
    this.walls = [true, true, true, true];
    this.visited = false;
    //this.h = 'rgba(255, 0, 255, .5)';
    this.h = 'white';
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

        if(this.visited){
            context.fillStyle = this.h;
            context.fillRect(x, y, w, w);
        }

        //context.strokeStyle = 'white';
        context.strokeStyle = 'black';
        context.lineWidth = 2;

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
    }

    this.getNeighbors = function(){
        var neighbors = [];

        var top = grid[index(i, j - 1)];
        var right = grid[index(i+1, j)];
        var bottom = grid[index(i, j+1)];
        var left = grid[index(i-1, j)];

        if(top){
            neighbors.push(top);
        }
        if(right){
            neighbors.push(right);
        }
        if(bottom){
            neighbors.push(bottom);
        }
        if(left){
            neighbors.push(left);
        }

        return neighbors;
    }

    this.checkNeighborsNotVisited = function(){
        var temp = this.getNeighbors();
        var neighbors = [];

        for(var i = 0; i < temp.length; i++){
            if(!temp[i].visited){
                neighbors.push(temp[i]);
            }
        }

        if(neighbors.length > 0){
            var r = Math.floor(Math.random() * neighbors.length);
            return neighbors[r];
        } else{
             return undefined;
        }
    }

    this.checkNeighborsSameRoom = function(){
        var neighbors = [];
        var temp = this.getNeighbors();
        for(var i = 0; i < temp.length; i++){
            if(this.visited && temp[i].visited && this.roomId === temp[i].roomId){
                neighbors.push(temp[i]);
            }
        }
    }
}
