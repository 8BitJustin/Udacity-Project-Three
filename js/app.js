// Enemies our player must avoid
const Enemy = function(x,y,spd) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.spd = spd;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x,y,spd) {
    this.x = x;
    this.y = y;
    this.spd = spd;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    // Needed but not currently used
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x += -101.25;
    }
    if (keyPress == 'up') {
        player.y -= 83;
    }
    if (keyPress == 'right') {
        player.x += 101.25;
    }
    if (keyPress == 'down') {
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
        alert('You won!');
    }

    // Collision function
    collision();
}

// Function to detect collisions
const collision = function() {
    if (player.x === enemy.x && player.y === enemy.y) {
        player.x = 202.5;
        player.y = 383;
    }
}

// Array with enemy positions
const enemyPosition = [217, 134, 51];
// Pulls one number by random to place as Y coordinate for enemy variable
const randomItem = enemyPosition[Math.floor(Math.random()*enemyPosition.length)];

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const player = new Player(202.5, 383, 50);
const enemy = new Enemy(0, randomItem, 50);

allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        65: 'left',
        87: 'up',
        68: 'right',
        83: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
