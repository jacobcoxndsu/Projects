window.onload = function () {
    //Grab the canvas objects
    var gameDisplay = document.getElementById("game");
    var uiDisplay = document.getElementById("ui");

    //Set there width and height
    var width = gameDisplay.width = uiDisplay.width = window.innerWidth;
    var height = gameDisplay.height = uiDisplay.height = window.innerHeight;

    //Grab the context objects
    var gameContext = gameDisplay.getContext('2d');
    var uiContext = uiDisplay.getContext('2d');

    var maze = new Maze(12, 12, 5, 128);
    maze.createMaze();

    var player = new Player(maze);
    player.color = getRandomColor();

    var show = function () {
        gameContext.resetTransform();
        gameContext.clearRect(0, 0, width, height);
        uiContext.clearRect(0, 0, width, height);

        var screenX = Math.floor(gameDisplay.width / 2);
        var screenY = Math.floor(gameDisplay.height / 2);
        var disX = (screenX - player.x);
        var disY = (screenY - player.y);

        gameContext.translate(disX, disY);

        //Render the screen here
        maze.show(gameContext);
        player.updatePosition(maze);
        player.show(gameContext);

        window.requestAnimationFrame(show);
    }
    
    window.addEventListener('keydown', function (event) {
        if (event.keyCode === 68) //d
            player.pressingRight = true;

        if (event.keyCode === 83) //s
            player.pressingDown = true;

        if (event.keyCode === 65) //a
            player.pressingLeft = true;

        if (event.keyCode === 87) //w
            player.pressingUp = true;
    });

    window.addEventListener('keyup', function (event) {
        if (event.keyCode === 68) //d
            player.pressingRight = false;

        if (event.keyCode === 83) //s
            player.pressingDown = false;

        if (event.keyCode === 65) //a
            player.pressingLeft = false;

        if (event.keyCode === 87) //w
            player.pressingUp = false;
    });

    show();
}
