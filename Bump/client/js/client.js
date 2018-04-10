var GAME;
var debug = true;

window.onload = function () {
    GAME = new Game();
    window.addEventListener('resize', GAME.resize, false);
}

document.onmousemove = function (event) {
    GAME.onmousemove(event);
    GAME.mouseX = event.clientX;
    GAME.mouseY = event.clientY;
}

function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

document.onkeydown = function (event) {
    GAME.onkeydown(event);
}

document.onkeyup = function (event) {
    GAME.onkeyup(event);
}
