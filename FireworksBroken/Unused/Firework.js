var fireworks = [];
var width;
var height;
var gravity;

function setup(){
    width = 700;
    height = 400;
    createCanvas(width,height);
    colorMode(HSB);
    gravity = createVector(0, 0.2);
    stroke(255);
    strokeWeight(4);
    background(0);
}

function draw(){
    colorMode(RGB)
    background(0, 0, 0, 100);
    //background(51);
    if(random(1) < .08){
        fireworks.push(new firework());
    }
    for(var i = fireworks.length - 1; i >= 0; i--){
        fireworks[i].update();
        fireworks[i].show();
        if(fireworks[i].done()){
            fireworks.splice(i, 1);
        }
    }
}







function firework(){
    this.hu = random(255);
    this.exploded = false;
    this.firework = new Particle(random(width),height, this.hu, true);
    this.particles = [];
    
    this.done = function(){
        if(this.exploded && this.particles.length === 0){
            return true;
        }else{
            return false;
        }
    }
    
    this.update = function(){
        if(!this.exploded){
            this.firework.applyForce(gravity);
            this.firework.update();
        
            if(this.firework.vel.y >= 0){
                this.exploded = true;
                this.explode();
            }
        }
        
        for(var i = this.particles.length -1; i >= 0; i--){
            this.particles[i].applyForce(gravity);
            this.particles[i].update();
            if(this.particles[i].done()){
                this.particles.splice(i, 1);
            }
        }
    }
    
    this.show = function(){
        if(!this.exploded){
            this.firework.show();
        }
        for(var i = 0; i < this.particles.length; i++){
            this.particles[i].show();
        }
    }
    
    this.explode = function(){
        for(var i = 0; i < 100; i++){
            var p = new Particle(this.firework.pos.x,this.firework.pos.y, this.hu, false);
            this.particles.push(p);
        }
    }
}







function Particle(x,y,hu,firework){
    this.pos = createVector(x,y);
    this.firework = firework;
    this.lifespan = 255;
    this.hu = hu;
    
    if(this.firework){
        this.vel = createVector(0,random(-13,-5));
    }
    else{
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(1,4));
    }
    this.acc = createVector(0,0);
    
    this.applyForce = function(force){
        this.acc.add(force);
    }
    
    this.update = function(){
        if(!this.firework){
            this.vel.mult(random(1.0, 0.9));
            this.lifespan -= 4;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        //clear acc at each moment in time
        this.acc.mult(0);
    }
    
    this.show = function(){
        colorMode(HSB);
        if(!this.firework){
            strokeWeight(2);
            //stroke(255, this.lifespan);
            stroke(this.hu, 255, this.lifespan);
        }
        else{
            strokeWeight(3);
            //stroke(255);
            stroke(this.hu, 255, 255, 255);
        }
        point(this.pos.x,this.pos.y);
    }
    
    this.done = function(){
        if(this.lifespan <= 0){
            return true;
        } else {
            return false;
        }
    }
    
    
    
    
}