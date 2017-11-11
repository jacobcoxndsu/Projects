function expansion(){
  this.canvas = document.getElementById('display');
  this.width = this.canvas.width = window.innerWidth;
  this.height = this.canvas.height = window.innerHeight;
  this.canvas.style.display = 'block';
  this.context = this.canvas.getContext('2d');

  this.map = [];

  this.createMap = function(){
    for(var j = 0; j < rows + 2; j++){
        for( var i = 0; i < cols + 2; i++){
            var cell = new Cell(i, j);
            cell.h = 'blue';
            this.map.push(cell);
        }
    }
    return this.map;
  }

  this.show = function(){
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillStyle = 'red';
    //this.context.fillRect(0, 0, this.width, this.height);
    for(var i = 0; i < this.map.length; i++){
      this.map[i].show(this.context);
    }
  }
}
