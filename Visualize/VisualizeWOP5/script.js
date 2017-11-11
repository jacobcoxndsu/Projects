var analyser, canvas, ctx, random = Math.random, c, going;

window.onload = function(){
    canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    setupWebAudio();
    draw();
    c = 0;
    going = true;
}

function setupWebAudio(){
    var audio = document.createElement('audio');
    audio.src = 'Sounds/01 Sweet Lovin.mp3';
    audio.controls = 'true';
    document.body.appendChild(audio);
    audio.style.width = window.innerWidth + 'px';
    
    var audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    var source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    source.connect(audioContext.destination);
    audio.play();
}

function draw(){
    requestAnimationFrame(draw);
    var freqByteData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(freqByteData);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillStyle = 'rgb(20, 20, 20)';
    
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var dif = canvas.width / (freqByteData.length / 5);
    
    for(var i = 1; i < freqByteData.length; i += 10){
        ctx.fillStyle = "rgb(" + freqByteData[i] + "," + freqByteData[i] + "," + freqByteData[i] + ")";
        //ctx.fillStyle = "rgb(" + freqByteData[i] + ", 0, 0 )";
        //ctx.fillStyle = "rgb(0, 0, " + freqByteData[i] + ")";
        ctx.fillRect(i * 1.4, canvas.height / 2 - freqByteData[i], dif, canvas.height / 2);
    }
}