// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/2O3nm0Nvbi4

var song;
var fft;
var button;

var mic;

function toggleSong() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
    }
}

function preload() {
    song = loadSound('Sounds/01 Rubik.mp3');
    mic = new p5.AudioIn();
    mic.connect(mic);
    mic.connect();
    mic.start();
}

function setup() {
    createCanvas(256, 256);
    colorMode(HSB);
    angleMode(DEGREES);
    button = createButton('toggle');
    button.mousePressed(toggleSong);
    
        
    fft = new p5.FFT(0.9, 256);
    fft.setInput(song);
    
    song.play();
    //fft = new p5.FFT(0.9, 128);
}
 

function draw() {
    background(0);
    
    //console.log(vol);
    var spectrum = fft.analyze();
    //console.log(spectrum);
    //stroke(255);
    noStroke();
    translate(width / 2, height / 2);
    
    //beginShape();
    var w = width / spectrum.length - 1;
    for (var i = 0; i < spectrum.length; i++) {
        //LINE
        //var height = map(i, 0, spectrum.length, 0, height);
        //stroke(i, 255, 255);
        //rect(i+w, 0, w, height);
        
        
        //ANGLE
        
        var angle = map(i, 0, spectrum.length, 0, 360);
        var amp = spectrum[i];
        var r = map(amp, 0, 256, 20, 100);
        //fill(i, 255, 255);
        var x = r * cos(angle);
        var y = r * sin(angle);
        stroke(i, 255, 255);
        line(0, 0, x, y);
        //vertex(x, y);
        //var y = map(amp, 0, 256, height, 0);
        //rect(i * w, y, w - 2, height - y);
        
    }
    //endShape();


}
