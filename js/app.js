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
    // Sets initial speed at start
    this.x += this.spd * dt;

    // Gives random speed when x is greater than canvas width (restarts)
    if (this.x > 550) {
        this.x = -101;
        this.spd = 150 + Math.floor(Math.random() * 350);
    }

    // Runs collision function, using 'this' as the argument
    collision(this);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class, with required update(), render() and
// a handleInput() methods.
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

}

// Collision between player and enemy check (ran within Enemy.prototype.update)
const collision = function(nme) {
    if (player.x < nme.x + 80 && player.x + 80 > nme.x &&
        player.y < nme.y + 60 && player.y + 60 > nme.y) {
        player.x = 202.5;
        player.y = 383;
    }
}

// Places all enemy objects in an array
const allEnemies = [];
// Places the player object in a variable called player
const player = new Player(202.5, 383, 50);
// Array with enemy positions
const enemyPosition = [217, 134, 51];
// Loops through allEnemies array, puts three enemies on screen at different Y positions
enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 250);
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys the Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        65: 'left',
        87: 'up',
        68: 'right',
        83: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
