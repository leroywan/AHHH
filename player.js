var playerCanvas = document.getElementById("playerCanvas");
var playerContext = playerCanvas.getContext("2d");
// shim for requestAnimationFrame

// UTILITIES

var CANVAS = {LENGTH:800, WIDTH:540}
	START = {X:67, Y:0},
	END = {X:800-START.X, Y:540-START.Y},
	GRAVITY = 9.8,
	DRAG = 1.05,
	MAXLEFT = 80,
	MAXRIGHT = 720,
	KEY = {LEFT:37, UP:38, RIGHT:39, DOWN:40}

// create character class and set properties

function Character(length, width, speed){
	this.pos = {x:0, y:0};
	this.length = length;
	this.width = width;
	this.speed = speed;
	this.middle = {x:this.pos.x + this.width/2, y:this.pos.y + this.length/2};
}

// create a draw method to draw new img each frame
Character.prototype.draw = function(img, length, width){
	playerContext.drawImage(img, this.pos.x, this.pos.y, length, width);
};

// create a method to set player position
Character.prototype.setPos = function(x, y){
	this.pos.x = x;
	this.pos.y = y;
}

// initialize player object from its class and create new image objects
var player = new Character(50, 50, 0);
var playerImg = new Image();
playerImg.src = "img/mr_square.png";
var parachuteImg = new Image();
parachuteImg.src = "img/parachute.png";
var playerOFaceImg = new Image();
playerOFaceImg.src = "img/mr_square_o_face.png";
var playerScaredFaceImg = new Image();
playerScaredFaceImg.src = "img/mr_square_scared_face.png";
var playerExcitedFaceImg = new Image();
playerExcitedFaceImg.src = "img/mr_square_excited_face.png";

// create variables for force that sets player position when no keys are pressed
var forceX = 1
var forceY = 1

// create methods to change player position when key events occurs
player.move = {
	left: function(){
		player.pos.x = player.pos.x - 1*forceX;
		forceX += 0.08;
		player.direction.right = false;
		player.direction.left = true;
	},
	up: function(){
		player.direction.up = true;
		player.direction.down = false;
		if(player.direction.up){
			player.pos.y = player.pos.y - 1*forceY;
			if (forceY > 1){
				forceY += 0.08;
			}else{
				forceY = 1.4;
			}
		}
	},
	right: function(){
		player.pos.x = player.pos.x + 1*forceX;
		forceX += 0.05;
		player.direction.left = false
		player.direction.right = true;
	},
	down: function(){
		player.direction.down = true;
		player.direction.up = false;
		if(player.direction.down){
			player.pos.y = player.pos.y + 1*forceY;
			forceY += 0.05;
		}
	},
	slowDownX: function(){
		if (player.direction.left){
			player.pos.x -= 2;
		}else if (player.direction.right){
			player.pos.x += 2;
		}
	}

}

// set initial properties of the player during the start of the game
player.setPos(375, 245);
player.direction = {left:false, right:false, up:false, down:false};
player.speed = 1;
player.distance = 0;
player.oFace = false;
player.scaredFace = false;
player.excitedFace = false;
player.lifeCount = 5;


// create a function that checks if the player is hitting the wall
function collisionWall(){
	if (player.pos.x <= START.X){
		player.pos.x++;
	};
	if (player.pos.y <= START.Y){
		player.pos.y++;
	};
	if (player.pos.x >= END.X-player.length){
		player.pos.x--;
	};
	if (player.pos.y >= END.Y-player.width){
		player.pos.y--;
	}
	player.direction.left = false;
	player.direction.right = false;
}
// create player inputs
keystate = {}
document.body.addEventListener("keydown", function(evt){
	evt.preventDefault();
	player.keydown = true;
	player.keyup = false;
	keystate[evt.keyCode] = true;
});

document.body.addEventListener("keyup", function(evt){
	forceX = 0;
	forceY = 0;
	player.keydown = false;
	player.keyup = true;
	delete keystate[evt.keyCode]
});

// obtain visable elements from document object
var playerLife = document.getElementById("lives");
var playerDistance = document.getElementById("distance");
var speedIncrease = 0;
// update each frame of the game
function update(){
	// check if player is dead
	if(player.lifeCount > 0){
		player.distance = player.distance + 2 + speedIncrease;
		speedIncrease = (player.distance/10)*0.001;
	}
	// change text within playerLife and playerDistance
	playerLife.innerText = "Lives: " + player.lifeCount;
	playerDistance.innerText = "Distance: " + Math.round(player.distance/10) + "m";
	player.parachute = false;

	// check if player is against the wall
	if (player.pos.x > START.X && player.pos.y > START.Y && player.pos.y < END.Y-player.width && player.pos.x < END.X-player.length && gameOver == false){
		if (KEY.LEFT in keystate){
			player.move.left();
		}
		if (KEY.UP in keystate){
			player.parachute = true;
			player.oFace = true;
			player.distance--;
			player.move.up();
		}
		if (KEY.RIGHT in keystate){
			player.move.right();
		}
		if (KEY.DOWN in keystate){
			player.excitedFace = true;
			player.distance++;
			player.move.down();
		}
		if ((player.direction.left || player.direction.right) && (player.keyup || KEY.UP || KEY.DOWN)){
			player.move.slowDownX();
		}
		if (player.keyup){
			player.oFace = false;
			player.excitedFace = false;
		}
	}else{
		collisionWall();
	}

	playerContext.clearRect(0, 0, CANVAS.LENGTH, CANVAS.WIDTH);
	if (player.parachute){
		playerContext.drawImage(parachuteImg, player.pos.x -50, player.pos.y - 80);
		player.oFace = true;
	};
	if (player.oFace){
		player.draw(playerOFaceImg, 50, 50);
	}else if (player.scaredFace){
		player.draw(playerScaredFaceImg, 50,50);
	}else if (player.excitedFace){
		player.draw(playerExcitedFaceImg, 50, 50);
	}else{
		player.draw(playerImg, 50, 50);
	}
	playerAnimationId = requestAnimFrame(update);
}

