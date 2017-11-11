function Room(x, y, w, h){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    
    this.draw = function(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}