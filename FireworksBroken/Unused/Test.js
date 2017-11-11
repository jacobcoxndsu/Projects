function setup(){
    var p = new LaunchParticle(1,3,255,78);
    p.display();
    
    p.show();
    
    var l = new ExplodeParticle(7,5,200,88);
    l.display();
    
    l.show();
    
    
}

function Particle(x, y, hu){
    this.x = x;
    this.y = y;
    this.hu = hu;
    
    this.display = function(){
        console.log(this.x + "  " + this.y + "  " + this.hu);
    }
}

function LaunchParticle(x, y, hu, n){
    Particle.call(this, x, y, hu);
    this.numberOne = n;
    
    this.show = function(){
        console.log(this.numberOne);
    }
}
LaunchParticle.prototype = new Particle();

function ExplodeParticle(x, y, hu, n){
    Particle.call(this, x, y, hu);
    this.numberTwo = n;
    
    this.show = function(){
        console.log(this.numberTwo);
    }
}
ExplodeParticle.prototype = new Particle();