// Enemies our player must avoid
let Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 510) {
        this.x = -50;
        // to generate and shuffle
        this.speed = 100 + Math.floor(Math.random() * 222);
      }

    // when the player touch the enemy(bugs :( )
    if (
        player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y
      ) {
        player.x = 200;
        player.y = 405;
      }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // set the player's image
        this.player = "images/char-boy.png";
    }

    // update the status of the player and render the character
    update() {

    }
    render() {
        ctx.drawImage(Resources.get(this.player), this.x, this.y);
    }
    handleInput(keyPress) {
        if (keyPress == "left" && this.x > 0) {
            this.x -= 105;
        }

        if (keyPress == "right" && this.x < 405) {
            this.x += 105;
        }

        if (keyPress == "up" && this.y > 0) {
            this.y -= 90;
        }

        if (keyPress == "down" && this.y < 405) {
            this.y += 90;
        }
        //modal and return player to start
        if (this.y < 0) {
            setTimeout(() => {
                alert("Congratulations! You won the game!");
                this.x = 200;
                this.y = 405;
            },300);
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Player(200, 405);

//enemy location on y axis

let enemyLocation = [60, 145, 230, 310];
enemyLocation.forEach(function(locationY) {
    let x = Math.floor((Math.random() * 500) + 50);
    enemy = new Enemy(-x, locationY, x);
    allEnemies.push(enemy);
  });

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});