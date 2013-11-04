//==========
// BRICKS
//==========

var g_score = 0;
var broken_brick_counter = 0;
var rowcolors = ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093", "#EB0093", "#EB0093", "#EB0093", "#EB0093", "#EB0093", "#EB0093", "#EB0093", "#EB0093", "#EB0093", "#EB0093", "#EB0093", "#EB0093", "#EB0093", "#EB0093", "#EB0093", "#EB0093"];


function Brick(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }

}


var g_bricks = new Brick({

	NROWS: 15,
	NCOLS: 15,
	BRICKWIDTH: 40.6,
	BRICKHEIGHT: 10,
	PADDING: 2,
	YHEIGHT: 70

});

Brick.prototype.update = function() {

	this.bricks = new Array(this.NROWS);
	for(i=0; i < this.NROWS; i++) {
		this.bricks[i] =  new Array(this.NCOLS);
		for(j=0; j < this.NCOLS; j++) {
			this.bricks[i][j] = 1;
			
		}
	}
	if(g_lifes == 0) this.reset();

};

Brick.prototype.collide = function (prevX, prevY) {

 //have we hit a brick?
  rowheight = this.BRICKHEIGHT + this.PADDING;
  colwidth = this.BRICKWIDTH + this.PADDING;
  
  row = Math.floor(prevY/rowheight);
  col = Math.floor(prevX/colwidth);
  
  //if so, reverse the ball and mark the brick as broken
  if (prevY < this.NROWS * rowheight && row >= 0 && col >= 0 && this.bricks[row][col] == 1) {
    this.bricks[row][col] = 0;
    broken_brick_counter++;
    g_score++;
       if(g_score > 0) {

            brick_sound.pause();
            brick_sound.currentTime = 0;
            brick_sound.play();
        }
        
    if(g_score == 5 || g_score == 10 || g_score == 15) { 

    		g_lifes = g_lifes + 1;
    		pluslife.play();

    	} else if(g_score == 100) {
    			g_lifes = g_lifes + 2;
    			pluslife.play();  		
    	} else if(g_score == 150) {
    			dominating.play();
    	} else if(broken_brick_counter == 3) {
    		triplekill.play(); 
    	} else if(broken_brick_counter == 15) {
    		monsterkill.play(); 
    	} else if(broken_brick_counter == 50) {
    		hollysh.play();
    	}

    return true;
  } else return false;

};

Brick.prototype.reset = function() {

	this.NROWS = 15;
	this.NCOLS = 15;
	this.BRICKWIDTH = 120;
	this.BRICKHEIGHT = 25;
	this.PADDING = 1;

};


Brick.prototype.render = function(ctx) {

	
	for(i=0; i < this.NROWS; i++) {
		ctx.fillStyle = rowcolors[i];
		for(j=0; j < this.NCOLS; j++) {
			if(this.bricks[i][j] == 1) {
				rect(ctx, 
					 (j * (this.BRICKWIDTH + this.PADDING)) + this.PADDING, 
					 (i * (this.BRICKHEIGHT + this.PADDING)) + this.PADDING,
					 this.BRICKWIDTH, this.BRICKHEIGHT);
			}
		}
	}
};