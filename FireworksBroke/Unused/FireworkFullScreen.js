var fireworks = [];
var width;
var height;
var gravity;

function setup(){
    width = window.innerWidth;
    height = window.innerHeight;
    createCanvas(width,height);
    colorMode(HSB);
    gravity = createVector(0, 0.03);
    stroke(0);
    strokeWeight(4);
    background(0);
}

function draw(){
    colorMode(RGB)
    background(0, 0, 0, 20);
    //background(51);
    if(random(1) < .06){
        if(random(1) < .3){
            fireworks.push(new firework(true));
        } else {
            fireworks.push(new firework(false));
        }
        
    }
    for(var i = fireworks.length - 1; i >= 0; i--){
        fireworks[i].update();
        fireworks[i].show();
        if(fireworks[i].done()){
            fireworks.splice(i, 1);
        }
    }
}







function firework(h){
    this.heart = h;
    this.hu = random(0, 255);
    this.exploded = false;
    this.size = random(3,6);
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
        
            if(this.firework.vel.y >= 3){
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
        var p;
        if(!this.heart){
            for(var i = 0; i < 50; i++){
                p = new Particle(this.firework.pos.x,this.firework.pos.y, this.hu, false);
                this.particles.push(p);
            }
        } else {
            for(var i = 0; i < 30; i++){
                p = new HeartParticle(this.firework.pos.x,this.firework.pos.y, this.hu, i, this.size);
                this.particles.push(p)
            }
        }
        
    }
}







function Particle(x,y,hu,firework){
    this.pos = createVector(x,y);
    this.firework = firework;
    this.lifespan = 255;
    this.hu = hu;
    if(hu >230)
        this.hu = random(0, 255);
    else
        this.hu = hu;
        
    
    if(this.firework){
        this.vel = createVector(random(-2,2),random(-8,-3));
    }
    else{
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(1,10));
    }
    this.acc = createVector(0,0);
    
    this.applyForce = function(force){
        this.acc.add(force);
    }
    
    this.update = function(){
        if(!this.firework){
            //this.vel.mult(random(1.0, 0.9));
            this.vel.mult(random(1.0, 0.9));
            this.lifespan -= random(0,3);
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        //clear acc at each moment in time
        this.acc.mult(0);
    }
    
    this.show = function(){
        colorMode(HSB);
        if(!this.firework){
            strokeWeight(3);
            //stroke(255, this.lifespan);
            stroke(this.hu, 255, this.lifespan);
        }
        else{
            strokeWeight(5);
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





function HeartParticle(x,y, hu, i, s){
    this.pointsx = [0, 1, 2, 3, 4, 5, 6, 7, 7, 6, 5, 4, 3, 2, 1, 0];
    this.pointsy = [3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0,-1,-2,-3,-4];
    
    this.index = i;
    this.size = s;
    this.degree = 360 / this.index;
    this.maxDegree = 360;
    this.pos = createVector(x,y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0,0);
    this.lifespan = 255;
    
    this.hu = hu;
    if(hu >230)
        this.hu = random(0, 255);
    else
        this.hu = hu;
    
    if(this.index < 16){
        this.vel = createVector((this.pointsx[this.index]) / this.size, (-this.pointsy[this.index]) / this.size);
    } else {
        this.vel = createVector((-this.pointsx[this.index - 15] / this.size), (-this.pointsy[this.index - 15]) / this.size);
    }
    
    this.applyForce = function(force){
        this.acc.add(force);
    }
    
    this.update = function(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
    
    this.show = function(){
        colorMode(HSB);
        if(!this.firework){
            strokeWeight(3);
            //stroke(255, this.lifespan);
            stroke(this.hu, 255, this.lifespan);
        }
        else{
            strokeWeight(5);
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




