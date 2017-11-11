var firework;
var gravity;

function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    stroke(255);
    strokeWeight(4);
    gravity = createVector(0, .2);
    
    firework = new Firework();
}

function draw(){
    background(50);
    firework.update();
    firework.show();
}



function Firework(){
    this.exploded = false;
    this.firework = new Particle(window.innerWidth/2, window.innerHeight/2 + 100);
    this.particles = [];
    
    this.update = function(){
        if(!this.exploded){
            this.firework.applyForce(gravity);
            this.firework.update();

            if(this.firework.vel.y > 0){
                this.exploded = true;
                this.explode();
            }
        }
        
        for(var i = 0; i < this.particles.length; i++){
            this.particles[i].applyForce(gravity);
            this.particles[i].update();
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
        for(var i = 0; i < 30; i++){
            var p = new ExplodedParticle(this.firework.pos.x, this.firework.pos.y, i);
            this.particles.push(p);
        }
    }
}


function Particle(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(0,random(-12,-8));
    this.acc = createVector(0,0);
    
    this.applyForce = function(force){
        this.acc.add(force);
    }
    
    this.update = function(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
    
    this.show = function(){
        point(this.pos.x,this.pos.y);
    }
}




function heartParticle(x,y,i){
    this.pointsx = [0, 1, 2, 3, 4, 5, 6, 7, 7, 6, 5, 4, 3, 2, 1, 0];
    this.pointsy = [3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0,-1,-2,-3,-4];
    
    this.index = i;
    this.degree = 360 / this.index;
    this.maxDegree = 360;
    this.pos = createVector(x,y);
    this.vel = p5.Vector.random2D();
    //this.vel.mult(random(1, 6));
    this.acc = createVector(0,0);
    
    if(this.index < 16){
        this.vel = createVector((this.pointsx[this.index]) / 2, (-this.pointsy[this.index]) / 2);
    } else {
        this.vel = createVector((-this.pointsx[this.index - 15] / 2), (-this.pointsy[this.index - 15]) / 2);
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
        point(this.pos.x,this.pos.y);
    }
}


