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

