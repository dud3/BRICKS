// ==========
// BALL STUFF
// ==========

// BALL STUFF

var g_lifes = 5;

function Ball(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

var g_ball = new Ball({
    cx: 150,
    cy: 200,
    radius: 5,
    color: '#545454',

    xVel: 2,
    yVel: 4
});

// Ball 2, with the half of the velocity
var g_ball2 = new Ball({
    cx: g_ball.cx * 1.2,
    cy: g_ball.cy,
    radius: g_ball.radius/2,
    color: '#545454',

    xVel: g_ball.xVel * 1.2,
    yVel: g_ball.yVel * 1.2
});

// Array of objects 
// Creates ramdom balls just to test the score shrink of the paddle scores
var g_i = 1;
var g_balls = 10 + g_i;
var g_arr = [];
for (g_i; g_i <= g_balls; g_i++) {
    g_arr.push(new Ball({cx:100 , cy:200, radius:g_i / 2, xVel:g_i, yVel:g_i}));
}

// Add properties to the prototype
// From whom we can create as many ojects as we want to
Ball.prototype.update = function () {
    // Remember my previous position
    var prevX = this.cx;
    var prevY = this.cy;
    
    // Compute my provisional new position (barring collisions)
    var nextX = prevX + this.xVel;
    var nextY = prevY + this.yVel;

    // Bounce off the paddles
    /*
    if (g_paddle3.collidesWith(prevX, prevY, nextX, nextY, this.radius) ||
        g_paddle2.collidesWith(prevX, prevY, nextX, nextY, this.radius))
    {nextX
        this.yVel *= -1;
        }
    */
    //if(g_socre_paddle1 >= 10 && g_socre_paddle1 <= 11) {
      //  this.xVel *= 1.01;
    //}

    // Check if it's colliding with the paddle
     if (nextY + this.radius > g_canvas.height - Paddle.prototype.halfHeight) {  
        if(g_paddle3.collide(prevX, nextX) || g_paddle1.collide(prevX, nextX)) {
            nextX = 8 * ((prevX - (g_paddle3.cx + Paddle.prototype.halfWidth / 2)) / Paddle.prototype.halfWidth);
            nextX = ((prevX + this.radius * 0.5) - (g_paddle1.cx + Paddle.prototype.halfWidth * 0.5)) * 4 / Paddle.prototype.halfWidth;
            this.yVel = -this.yVel;
            // Reste our broken brick counter to 0
            broken_brick_counter = 0;
        } else if(nextY > g_canvas.height + this.radius) {
            g_lifes--;
            this.reset();
        } else if(g_lifes == 0) {
            goMusic.play();
            alert("Game Over, YOU LOST, OK to play again"); location.reload(); 
            }
          else if(g_score == 225) { alert("Game Over, YOU WON!!!, OK to play again"); location.reload(); }
    }  

    if(g_bricks.collide(prevX, prevY)) {
        this.yVel = -this.yVel;
    }

    // Bounce off right and left edges
    if (nextX < 0 || 
        nextX > g_canvas.width) {
        this.xVel *= -1;
            wall_sound.pause();
            wall_sound.currentTime = 0;
            wall_sound.play();
    
    }

    if(nextY < 0) this.yVel *= -1;
    
    // Our little socring system inside update method
    // If the nextX collides with 0, socre for paddel1 and vice versa
    //if(nextX < 0) g_socre_paddle2++;
    //else if(nextX > g_canvas.width) g_socre_paddle1++;

    //.using whatever velocity I've ended up with

    this.cx += this.xVel;
    this.cy += this.yVel;
};

 //Stop reseting the ball
Ball.prototype.reset = function () {
    this.cx = 300;
    this.cy = 200;
    this.xVel = -5;
    this.yVel = 5;
}; 


Ball.prototype.render = function (ctx) {
    fillCircle(ctx, this.cx, this.cy, this.radius, '#FFFFFF');
};