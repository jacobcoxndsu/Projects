var width;
var height;
var gravity;
var firework;

setup = function(){
    "use strict";
    width = window.innerWidth;
    height = window.innerHeight;
    createCanvas(width, height);
    
    gravity = createVector(0, 10);
    
    //var ctx = canvas.getContext("2d");
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    //ctx.stroke();
    
    firework = new Firework();
}

draw = function(){
    //context.fillStyle = "#000";
    //context.fillRect(0, 0, canvas.width, canvas.height);
    
    //var r = new Point(100, 200);
    //r.draw();
    
    firework.update();
    firework.show();
    
    //firework.launch.pos.y--;
}









function Firework(){
    this.hu = random(0, 255);
    this.particles = [];
    this.launch = new LaunchParticle(random(width),height, this.hu);
    this.exploded = false;
    
    this.update = function(){
        if(!this.exploded){
            this.launch.applyForce(gravity);
            this.launch.update();
        
            if(this.launch.vel.y >= 3){
                this.exploded = true;
                this.explode();
            }
        }
        
        for (var i = this.particles.length -1; i >= 0; i--){
            this.particles[i].applyForce(gravity);
            this.particles[i].update();
            if(this.particles[i].done()){
                this.particles.splice(i, 1);
            }
        }
    }
    
    this.show = function(){
        if(!this.exploded){
            this.launch.show();
        }
        for(var i = 0; i < this.particles.length; i++){
            this.particles[i].show();
        }
    }
    
    this.explode = function(){
        for(var i = 0; i < 50; i++){
            p = new ExplodeParticle(this.launch.pos.x, this.launch.pos.y, this.hu);
            this.particles.push(p);
        }
    }
    
    this.done = function(){
        if(this.exploded && this.particles.length === 0){
            return true;
        }else{
            return false;
        }
    }
}









//Main Particle object
function Particle(x, y, hu){
    //Variables for all particles
    this.x = x;
    this.y = y;
    this.hu = hu;
    this.lifeSpan = 255;
    this.vel = createVector(0,random(-13,-5))
    this.acc;
    this.pos;
    
    //Updates every particle
    this.update = function(){
        //decrement the lifespan
        this.lifespan -= random(0,3);
        
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        
        //this.vel.mult(random(1.0, 0.9));
        
        //reset acceleration each iteration
        this.acc.mult(0);
    }
    
    this.applyForce = function(force){
        this.acc.add(force);
    }
    
    //returns if this particles lifespan is spent
    this.done = function(){
         if(this.lifespan <= 0){
            return true;
        } else {
            return false;
        }
    }
}










function LaunchParticle(x, y, hu){
    Particle.call(this, x, y, hu);
    this.stroWeigh = 5;
    
    //Creates the velocity for the Particle
    this.vel = createVector(random(-2,2),random(-8,-3));
    this.acc = createVector(0,0);
    this.pos = createVector(this.x, this.y);
    
    this.show = function(){
        //colorMode(HSB);
        strokeWeight(this.stroWeigh);
        point(this.pos.x,this.pos.y);
    }
}
LaunchParticle.prototype = new Particle();









//Particles that Make up the "Firework" Part
function ExplodeParticle(x, y, hu){
    Particle.call(this, x, y, hu);
    this.stroWeigh = 3;
    
    //Creates the velocity for the Particle
    this.vel = p5.Vector.random2D();
    
    this.show = function(){
        //colorMode(HSB);
        strokeWeight(this.stroWeigh);
        //******stroke(this.hu, 255, this.lifespan);
        
        point(this.pos.x,this.pos.y);
    }
}
ExplodeParticle.prototype = new Particle();
