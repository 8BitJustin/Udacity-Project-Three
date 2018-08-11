'use strict'

// Intro
console.log(`%c
-------------------------------------------------
             Udacity Arcade Game
-------------------------------------------------

Use the arrow or asdw keys to move.
Get one point for each time you get to the river.
Unlock a new character every 5 points.
Lose all points if you get hit.

GLHF getting to 20!
`, "font-family:monospace");



// Enemy class
const Enemy = function(x,y,spd) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.spd = spd;
    this.sprite = 'images/enemy-bug.png';
};

// Updates the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Gives random speed when x is greater than canvas width (restarts)
    if (this.x > 550) {
        // Puts enemy at start
        this.x = -101;
        // Gives random speed
        this.spd = 150 + Math.floor(Math.random() * 350);
    } else {
        // Initial speed
        this.x += this.spd * dt;
    }

    // Runs collision function
    this.collision();
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Collision between player and enemy check
Enemy.prototype.collision =  function() {
    if (player.x < this.x + 80 && player.x + 80 > this.x &&
        player.y < this.y + 60 && player.y + 60 > this.y) {
        player.x = 202.5;
        player.y = 383;
        points = 0;
        console.log(`You were hit, points reset to ${points}.`);
    }
}

// Player class, with required update(), render() and handleInput() methods.
const Player = function(x,y,spd) {
    this.x = x;
    this.y = y;
    this.spd = spd;
}

Player.prototype.update = function() {
    this.charSwap();
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Swaps sprite char depending on points
Player.prototype.charSwap = function() {
    switch(true) {
        case points > 19:
            this.sprite = 'images/char-princess-girl.png';
            break;
        case points > 14:
            this.sprite = 'images/char-pink-girl.png';
            break;
        case points > 9:
            this.sprite = 'images/char-horn-girl.png';
            break;
        case points > 4:
            this.sprite = 'images/char-cat-girl.png';
            break;
        default:
            this.sprite = 'images/char-boy.png';
            break;
    }
}

// Button inputs to play the game
Player.prototype.handleInput = function(keyPress) {
    if (keyPress === 'left' || keyPress === 'arrowLeft') {
        player.x += -101.25;
    }
    if (keyPress === 'up' || keyPress === 'arrowUp') {
        player.y -= 83;
    }
    if (keyPress === 'right' || keyPress === 'arrowRight') {
        player.x += 101.25;
    }
    if (keyPress === 'down' || keyPress === 'arrowDown') {
        player.y -= -83;
    }

    // Keep player within canvas
    if (player.y > 383 ) {
        player.y = 383;
    }
    if (player.x > 404) {
        player.x = 404;
    }
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.y <= 0) {
        player.x = 202.5;
        player.y = 383;

        // Adds to win variable everytime the river is reached
        points++;
        if (points === 1) {
            console.log(`You have ${points} point!`)
        } else {
            console.log(`You have ${points} points!`);
        }
    }
}

// Keeps track of points
let points = 0;
// Places all enemy objects in an array
const allEnemies = [];
// Places the player object in a variable called player
const player = new Player(202.5, 383, 50);
// Array with enemy positions
const enemyPosition = [217, 134, 51];
// Loops through allEnemies array, puts three enemies on screen at different Y positions
enemyPosition.forEach(function(posY) {
    const enemy = new Enemy(0, posY, 250);
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys the Player.handleInput() method. For both arrows and asdw
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        65: 'left',
        37: 'arrowLeft',
        87: 'up',
        38: 'arrowUp',
        68: 'right',
        39: 'arrowRight',
        83: 'down',
        40: 'arrowDown'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
