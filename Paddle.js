// A generic constructor which accepts an arbitrary descriptor object
function Paddle(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.

Paddle.prototype.halfWidth = 40;
Paddle.prototype.halfHeight = 2.5;

// Score counters for each paddle
var g_socre_paddle1 = 0, 
    g_socre_paddle2 = 0;    

Paddle.prototype.update = function () {
    if (g_keys[this.GO_UP]) {
        this.cy -= 5;
        // Don't pass the above wall of canvas
        if(this.cy < Paddle.prototype.halfHeight) {
            this.cy += 5;
        }
    } else if (g_keys[this.GO_DOWN]) {
        this.cy += 5;
        // Don't pass the bottom wall canvas
        if(this.cy > g_canvas.height - Paddle.prototype.halfHeight) {
            this.cy -= 5;
        }
    } else if (g_keys[this.GO_RIGHT]) {      // Go to the right
          this.cx += 5;
        // Don't pass throught the right wall of the canvas
        if(this.cx > g_canvas.width - Paddle.prototype.halfWidth) {
            this.cx -= 5;
        }   // Paddle 1 don't move more than 100 px to the right
    } else if (g_keys[this.GO_LEFT]) {       // Go to the left
        this.cx -= 5;
        // Don't pass thought the left wall
        if(this.cx < Paddle.prototype.halfWidth) {
            this.cx += 5;
        }   // Paddle 2 don't move more than 100 px to the left
            if(g_paddle2.cx < g_canvas.width / 1.48 + Paddle.prototype.halfWidth){
                g_paddle2.cx += 5;
        }
    }
};

Paddle.prototype.render = function (ctx, color) {
    // (cx, cy) is the centre; must offset it for drawing
    fillBox(ctx, 
                 this.cx - this.halfWidth,
                 this.cy - this.halfHeight,
                 this.halfWidth * 2,
                 this.halfHeight * 2,
                 this.color);
};

Paddle.prototype.collidesWith = function (prevX, prevY, 
                                          nextX, nextY, 
                                          r) {
    var paddleEdge = this.cx;
    // Check X coords
    if ((nextX - r < paddleEdge && prevX - r >= paddleEdge) ||
        (nextX + r > paddleEdge && prevX + r <= paddleEdge)) {
        // Check Y coords
        if (nextY + r >= this.cy - this.halfHeight &&
            nextY - r <= this.cy + this.halfHeight) {
            // It's a hit!
            return true;
        }
    }
    // It's a miss!
    return false;
};

// New collidion decextion
Paddle.prototype.collide = function (prevX, nextX) {

    var paddlex = this.cx;
    var paddlew = Paddle.prototype.halfWidth;
    
    if(prevX > paddlex - paddlew && prevX < paddlex + paddlew) {
        //nextX = 8 * ((prevX - (paddlex + paddlew / 2)) / paddlew);
        if(g_score > 0) {

            collision_sound.pause();
            collision_sound.currentTime = 0;
            collision_sound.play();
        }
        
        return true;
    } else
        return false;

};