// =====
// UTILS
// =====

function clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function fillCircle(ctx, x, y, r, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

function fillBox(ctx, x, y, w, h, style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
}

function rect(ctx,x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

// Helper Function to display the socre
function displayScore(ctx) {

    //Deffault font : size 40px Arial bold
    var fontSize = "40px Impact, fantasy";
    var fontColor = "white";
    if((g_socre_paddle1 && g_socre_paddle2) >= 40)  fontColor = "orange";
    if((g_socre_paddle1 && g_socre_paddle2) >= 100) fontColor = "red";

    ctx.font = fontSize;
    ctx.fillStyle = fontColor;
    ctx.fillText(g_score , g_canvas_width * 0.07, g_canvas_height / 1.35);
    ctx.fillStyle = "blue";
    ctx.fillText("SCORE", g_canvas_width * 0.01, g_canvas_height / 1.5);

    ctx.fillStyle = "white";
    ctx.fillText(broken_brick_counter, g_canvas_width / 1.06, g_canvas_height / 1.1);  
    ctx.fillText(g_lifes, g_canvas_width/ 1.09, g_canvas_height / 1.34);
    ctx.fillStyle = "green";
    ctx.fillText("LIFES", g_canvas_width/ 1.16, g_canvas_height / 1.5);

}

// Update and render the random balls
function randomBalls_update() {
 
        for(var g_i = 1; g_i < g_balls; g_i++){
            g_arr[g_i].update();
        }
}

function randomBalls_render(ctx) {

        for(var g_i = 1; g_i < g_balls; g_i++){
            g_arr[g_i].render(ctx);
        }
}

//Do this when collides == true
function collideAction(ball, p) {
    ball.vy = -ball.vy;
    
    if(paddleHit == 1) {
        ball.y = p.y - p.h;
        particlePos.y = ball.y + ball.r;
        multiplier = -1;    
    }
    
    else if(paddleHit == 2) {
        ball.y = p.h + ball.r;
        particlePos.y = ball.y - ball.r;
        multiplier = 1; 
    }
}

// Function for emitting particles
function emitParticles(ctx) { 
    for(var j = 0; j < particles.length; j++) {
        par = particles[j];
        
        ctx.beginPath(); 
        ctx.fillStyle = "white";
        if (par.radius > 0) {
            ctx.arc(par.x, par.y, par.radius, 0, Math.PI*2, false);
        }
        ctx.fill();  
        
        par.x += par.vx; 
        par.y += par.vy; 
        
        // Reduce radius so that the particles die after a few seconds
        par.radius = Math.max(par.radius - 0.05, 0.0); 
        
    } 
}

function gameOver(ctx) {
    ctx.fillStlye = "white";
    ctx.font = "20px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over - You scored "+points+" points!", W/2, H/2 + 25 );
}