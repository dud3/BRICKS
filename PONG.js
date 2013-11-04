// "Crappy PONG" -- step by step
//
// Step 13: Simplify
/*

Supporting timer-events (via setInterval) *and* frame-events (via requestAnimationFrame)
adds significant complexity to the the code.

I can simplify things a little by focusing on the latter case only (which is the
superior mechanism of the two), so let's try doing that...

The "MAINLOOP" code, inside g_main, is much simplified as a result.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

// Sound
var mainMusic = document.getElementById("main_music");
var pluslife =  document.getElementById("food");
var monsterkill = document.getElementById("monsterkill");
var dominating = document.getElementById("dominating");
var triplekill = document.getElementById("triplekill");
var hollysh = document.getElementById("hollysh");
var goMusic = document.getElementById("gameOver");

var collision_sound = document.getElementById("collide");
var brick_sound = document.getElementById("brick");
var wall_sound = document.getElementById("soundEfx");

// Load data ...
var files = [mainMusic, pluslife, monsterkill, dominating, triplekill, hollysh, goMusic, collision_sound, brick_sound, wall_sound];
var counter = 0;

var start = document.getElementById("start");

for(var i = 0; i < files.length; i++) {
    var file = files[i];
    file.addEventListener("loadeddata", function() {
        counter++;
        var percent = Math.floor((counter/files.length)*100);
        loading.innerHTML = "Loading " + percent + "%";
    });
}

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");
var g_canvas_width = g_canvas.width, g_canvas_height = g_canvas.height;



/*
0        1         2         3         4         5         6         7         8         9
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// ============
// PADDLE STUFF
// ============

// PADDLE 1

var KEY_W = 'W'.charCodeAt(0);
var KEY_S = 'S'.charCodeAt(0);
var KEY_A = 'A'.charCodeAt(0);
var KEY_D = 'D'.charCodeAt(0);

// PADDLE Multiplayer

var KEY_I = 'I'.charCodeAt(0);
var KEY_K = 'K'.charCodeAt(0);
var KEY_J = 'J'.charCodeAt(0);
var KEY_L = 'L'.charCodeAt(0);

var g_paddle3 = new Paddle({
    cx : Paddle.prototype.halfWidth,
    cy : g_canvas_height - Paddle.prototype.halfHeight,
    color: '#8C8C8C',

    GO_LEFT : KEY_A,
    GO_RIGHT : KEY_D

});

var g_paddle1 = new Paddle({
    cx : g_canvas_width - Paddle.prototype.halfWidth,
    cy : g_canvas_height - Paddle.prototype.halfHeight,
    color : '#3773CC',
    
    GO_LEFT : KEY_J, 
    GO_RIGHT : KEY_L 
});


var g_paddle2 = new Paddle({
    cx : g_canvas_width / 1.06,
    cy : g_canvas_height / 1.2,
    color : 'white',
    
    GO_UP   : KEY_I,
    GO_DOWN : KEY_K,
    GO_LEFT : KEY_J, 
    GO_RIGHT : KEY_L 
});


// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {

    // play main music
    mainMusic.play();

    processDiagnostics();

   // g_bricks.update(du);

    g_ball.update(du);
    g_ball2.update(du); 
    
    g_paddle3.update(du);


    if(g_multiplayer) g_paddle1.update(du);
    
    if(g_extraballs) randomBalls_update(du);
    // Uncoment this to see how the font shinks after 100 and 1000 score of pad2
}

// -------------------------
// GAME-SPECIFIC DIAGNOSTICS
// -------------------------

var g_extraballs = false;
var g_allowMixedActions = true;
var g_useExtras = true;
var g_useGravity = false;
var g_multiplayer = false;

var KEY_EXTRABALLS  = 'E'.charCodeAt(0);
var KEY_MULTIPLAYER = 'M'.charCodeAt(0);
/*
var KEY_EXTRAS  = keyCode('E');
var KEY_GRAVITY = keyCode('G');
var KEY_MIXED   = keyCode('M');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');
*/
function processDiagnostics() {
    
    // Handle these simple diagnostic options,
    // as defined by the KEY identifiers above.
    //
    // The first three are toggles; the last two are not.
    //
    // NB: The HALT and RESET behaviours should apply to
    // all three ships simulaneously.
    
   if (eatKey(KEY_EXTRABALLS)) {
        g_extraballs = !g_extraballs;
    }
   
   if (eatKey(KEY_MULTIPLAYER)) {
        g_multiplayer = !g_multiplayer;
    }

    /* All togather
    if (eatKey(KEY_MIXED)) {
        g_allowMixedActions = !g_allowMixedActions;
    }
    // Add Gravity
    if (eatKey(KEY_GRAVITY)) {
        g_useGravity = !g_useGravity;
    }

    // Halt all ships
    if (eatKey(KEY_HALT)) {
        g_ship.halt();
        g_extraShip1.halt();
        g_extraShip2.halt();
    }
    // Reset to the initial state
    if (eatKey(KEY_RESET)) {
        g_ship.reset();
        g_extraShip1.reset();
        g_extraShip2.reset();
    }
    */
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    g_bricks.render(ctx);

    g_ball.render(ctx);
    g_ball2.render(ctx);
    
    displayScore(ctx);

    g_paddle3.render(ctx);

    if (g_extraballs) randomBalls_render(ctx);

    if (g_multiplayer) g_paddle1.render(ctx);
    // Uncoment to see the effect
   
    
}

// Kick it off
g_main.init();