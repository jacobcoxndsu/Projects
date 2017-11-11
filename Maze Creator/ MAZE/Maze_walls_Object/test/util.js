/**
 @TODO needs to be fixed really bad...
 *Creates the index in a 1d array given the coordinate in 2d space.
 *@param {Number} i
 *@param {Number} j
 *@return {Number} Index given i and j
 *@return {error} -1 if it is out of bounds of the grid
 */
function index(i, j, cols, rows) {
    if (cols) {
        if (!rows) {
            rows = cols;
        }
    } else {
        return -1;
    }

    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return i + j * cols;
}

function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var color = 'rgb(' + r + ',' + g + ',' + b + ')';

    return color;
}

function getRandomSeed(){

}
