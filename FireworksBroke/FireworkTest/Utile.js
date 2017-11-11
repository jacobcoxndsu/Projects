//THIS IS A UTILITY CLASS CREATED TO MAKE USING JAVASCRIPT GRAPHICS EASIER
/*
It requires the use of two mathods setup() and draw()
*/

var loaded = false;
var interval;
var canvas;
var context;

window.onload = function(){
    //Check to see if the user made an update and setup function
    if(typeof setup == 'function' && typeof draw == 'function'){
        setup();
        //setInterval();
        loaded = true;
    }
    else{
        //IF BOTH METHODS ARE NOT THERE
        console.log("ERROR WITH SETUP OR UPDATE");
        clearInterval(interval);
        console.log("Interval Cleared");
    }
    //END OF PROGRAM
}

//Only runs if user has a update() and setup() function
interval = setInterval(function(){
    if(loaded){
        context.clearRect(0, 0, canvas.width, canvas.height);
        draw();
    }
}, 30);

createCanvas = function(w, h){
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;
}









random = function(min, max){
    rand = Math.random();
    
    if(typeof min === 'undefined'){
        return rand;
    }
    if(typeof max === 'undefined'){
        return rand * min;
    }
    
    if(min > max){
        var temp = min;
        min = max;
        max = temp;
    }
    
    return rand * (max-min) + min;
}

strokeWeight = function(num){
    context.lineWidth = num;
}

line = function (ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}









function Point(x, y){
    this.x = x;
    this.y = y;
    
    this.draw = function(){
        context.beginPath();
        context.arc(this.x, this.y, 1, 0, 2 * Math.PI, true);
        context.fill();
        context.stroke();
    }
}

point = function(x, y){
    var p = new Point(x, y);
    p.draw();
}











/*The Vector function and attributes creates vectors in 2d and 3d for use with gaming and math.*/

function Vector(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
    
    this.set = function(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    this.add = function(x, y, z){
        this.x += x || 0;
        this.y += y || 0;
        this.z += z || 0;
        return this;
    }
    
    this.sub = function(x, y, z){
        this.x -= x || 0;
        this.y -= y || 0;
        this.z -= z || 0;
        return this;
    }
    
    this.mult = function(n){
        this.x *= n || 0;
        this.y *= n || 0;
        this.z *= n || 0;
        return this;
    }
    
    this.div = function(n){
        this.x /= n;
        this.y /= n;
        this.z /= n;
        return this;
    }
    
    this.mag = function(){
        return Math.sqrt(this.magSq());
    }
    
    this.magSq = function(){
        return (this.x * this.x) + (this.y * this.y) + (this.z * this.z);
    }
    
    this.dot = function(x, y, z){
        return  this.x * (x || 0) +
                this.y * (y || 0) +
                this.z * (z || 0);
    }
    
    this.cross = function(v){
        if(v instanceof Vector){
            var x = this.y * v.z - this.z * v.y;
            var y = this.z * v.x - this.x * v.z;
            var z = this.x * v.y - this.y * v.x;
            
            return new Vector(x, y, z);
        }
        return null;
    }
    
    
    
    this.toString = function(){
        return "Vector: [" + this.x + ", " + this.y + ", " + this.z + "]";
    }
    
    this.copy = function(){
        return new Vector(this.x, this.y, this.z);
    }
}

createVector = function(x, y, z){
    return new Vector(x, y, z);
}




