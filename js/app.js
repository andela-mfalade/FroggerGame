/*   SCORE   */
var score                = 0;
var levelValue           = 4;
var scorePanel           = document.getElementById("scoreVal");
var lifeHolder           = document.getElementById("heartSection");
var lifeHolderArray      = lifeHolder.children;
var arrayLength          = lifeHolderArray.length;
var easyLevelSelector    = document.getElementById("easy");
var mediumLevelSelector  = document.getElementById("medium");  
var hardLevelSelector    = document.getElementById("hard"); 
var playerSelect         = document.getElementById("choosePlayer");
    scorePanel.innerText = score;


// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    if ( this.x <= 520 ) {
        this.x += this.speed * dt * levelValue;
    }
    else {
        this.x = -100;
    }    
    // which will ensure the game runs at the same speed for
    // all computers.

   if( Math.abs(this.y - player.y) <= 25 && Math.abs(this.x - player.x) <= 70 ) {
        player.x = 200;
        player.y = 405;
        score   -= 150;
        scorePanel.innerText = score;
        arrayLength -= 1;
        if (arrayLength >= 0){
           lifeHolderArray[arrayLength].style.opacity = .1; 
        }
        else {
            alert("Game Over!!\n Your score is: " + (score + 150) + "!");
            location.reload();
        }        
   }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Place all enemy objects in an array called allEnemies
var allEnemies  = [];

var bug1  = new Enemy(-100,63,35);
var bug2  = new Enemy(100,227,30);
var bug3  = new Enemy(500,145,25);
var bug4  = new Enemy(-1000,227,40);
var bug5  = new Enemy(-4400,63,50);

allEnemies.push( bug1, bug2, bug3, bug4, bug5 );


/*
PLAYER SECTION
*/
 
// Now write your own player class

var charactersListHolder = document.getElementById("characterSelect");


var bindImagesToClickEvent = function(ImageSet) {
    var charImg = ImageSet.querySelector('img');
    var imageUrl = charImg.getAttribute('src');
    charImg.addEventListener("click", function() {
       player.playerImage = imageUrl;
    });    
}

for(var i = 0; i < charactersListHolder.children.length; i++ ) {  
    bindImagesToClickEvent(charactersListHolder.children[i]);
}

var Player = function() {
    this.playerImage = 'images/char-horn-girl.png';
    this.x = 200;
    this.y = 405;
}

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(dt) {

}


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.playerImage), this.x, this.y);
}

Player.prototype.handleInput = function(navDirection) {


    switch ( navDirection ) {
        case 'left':
            if ( this.x <= 0) {
                this.x -= 0;
            }
            else {
                this.x -= 100 ;
            }                
        break;

        case 'up':
            if (this.y <= 82) {
                this.x = 200;
                this.y = 405;
                score += 500;
                scorePanel.innerText = score;
            } 
            else {
                this.y -= 82;
            }                
        break;

        case 'right':
            if ( this.x >= 400 ) {
                this.x += 0;
            }
            else {
                this.x += 100; 
            }                
        break;

        case 'down':
            if ( this.y >= 340 ) {
                this.y += 0;
            }
            else {
                this.y += 82;
            }                
        break;

    }


      
}

// Now instantiate your objects.

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


/*
BONUS SECTION
*/


var Bonus = function(bonusImage,x,y,speed,worth) {
    this.giftUrl = bonusImage;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.worth = worth;
};

Bonus.prototype.render = function() {
    ctx.drawImage(Resources.get(this.giftUrl), this.x, this.y);
}

Bonus.prototype.update = function(dt) {
    if ( this.x <= 3000 ) {
        this.x += this.speed;
    }
    else {
        this.x = 0;
    }

   if( Math.abs(this.y - player.y) <= 25 && Math.abs(this.x - player.x) <= 70 ) {
        this.x = -3000;
        score += this.worth;
        scorePanel.innerText = score;
   }
}

var allBonus  = [];

var key       = new Bonus('images/key.png', -690, 240 , 3, 50);
var heart     = new Bonus('images/heart.png', -1110, 80, 3, 500);
var blueGem   = new Bonus('images/blue.png', -2915, 145, 2, 200);
var star      = new Bonus('images/star.png', -10015, 80, 4, 1000);
var oops      = new Bonus('images/Rock.png', -2015, 145, 2,-5000);
var greenGem  = new Bonus('images/green.png', -1015, 230, 2, 300);
var orangeGem = new Bonus('images/orange.png', -2222, 65, 2, 100);

allBonus.push(key, heart, oops, blueGem, greenGem, orangeGem, star);

heart.update = function(dt) {
    if ( this.x <= 3000 ) {
        this.x += this.speed;
    }
    else {
        this.x = 0;
    }

   if( Math.abs(this.y - player.y) <= 25 && Math.abs(this.x - player.x) <= 70 ) {
        this.x = -3000;
        if(arrayLength > 0 && arrayLength < 10){
            arrayLength+=1
            lifeHolderArray[arrayLength-1].style.opacity = 1; 
        }
               
   }
}

easyLevelSelector.addEventListener("click", function(){
    levelValue = 6;
});

mediumLevelSelector.addEventListener("click", function(){
    levelValue = 11;
});

hardLevelSelector.addEventListener("click", function(){
    levelValue = 15;
}); 
