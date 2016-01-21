var gameCanvas = document.getElementById("gameCanvas");
var gameContext = gameCanvas.getContext("2d");
// shim for requestAnimationFrame
window.requestAnimFrame = (function(){
		  return  window.requestAnimationFrame       ||
		          window.webkitRequestAnimationFrame ||
		          window.mozRequestAnimationFrame    ||
		          function( callback ){
		            window.setTimeout(callback, 1000 / 60);
		          };
		})();
// Create a function that retrieves a random number
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// create object to display clouds
var cloudImage = new Image();
cloudImage.src = "img/cloud.png";

// create an object for all props and set main properties
function Prop(x, y, width, length, img){
	this.pos = {x:x, y:y};
	this.width = width;
	this.length = length;
	this.img = img;
	this.draw = function(){
		gameContext.drawImage(this.img, this.pos.x, this.pos.y)
	};
	this.setPos = function(x, y){
		this.pos.x = x;
		this.pos.y = y;
	};
}

// Create cloud object extending from Prop object
function Cloud(x, y, width, length, img, collisionReady, exploded){
	Prop.call(this, x, y, width, length, img);
	// Set properties for the statea of the cloud
	this.collisionReady = true;
	this.exploded = false;
}

// Create an object for a destroyed cloud
var cloudStage2 = new Image();
cloudStage2.src = "img/cloud_2.png";

// create a method for the cloud object to show explosion when exploded state is true
Cloud.prototype = {
	constructor:Cloud,
	explode: function(){
		gameContext.drawImage(cloudStage2, this.pos.x, this.pos.y);
		this.exploded = true;
	}
}

// create a heart object similar to cloud but increase player's health
function Heart(x, y, width, length, img, obtained){
	Prop.call(this, x, y, width, length, img);
	this.obtained = false;
}

var heart = new Image();
heart.src = "img/heart.svg";
Heart.prototype = {
	constructor:Heart,
	// create a method to hide the heart when the heart is obtained
	disappear: function(){
		this.obtained = true;
	}
}

// Set a heart to appear at a set interval 
function loopHeartImg(heart, minX, maxX){
	if (heart.pos.y <= -100){
		heart.pos.y = 540*16;
		heart.pos.x = getRandomInt(minX, maxX);
	}
}

// initialize heart object
var heart = new Heart(0, 0, 30, 30, heart);

// create a function that alters properties when a cloud is destroyed
function collisionCloud(cloud){
	if (player.pos.x < cloud.pos.x + 100 && 
		player.pos.x > cloud.pos.x - 25 && 
		player.pos.y < cloud.pos.y + 50 && 
		player.pos.y > cloud.pos.y - 25 &&
		cloud.collisionReady){
		gameContext.clearRect(cloud.pos.x, cloud.pos.y, cloud.width, cloud.length);
		if(!cloud.exploded){
			player.lifeCount -= 1;
		}
		cloud.explode();
		player.scaredFace = true;
		cloud.collisionReady = false
		setTimeout(function(){
	    	cloud.collisionReady = true;
	    	player.scaredFace = false;
	    }, 500);
	};
}


// initialize each cloud 
var cloud1 = new Cloud(0, 0, 100, 150, cloudImage);
var cloud2 = new Cloud(0, 0, 100, 150, cloudImage);
var cloud3 = new Cloud(0, 0, 100, 150, cloudImage);
var cloud4 = new Cloud(0, 0, 100, 150, cloudImage);
cloudArray = [cloud1, cloud2, cloud3, cloud4];

// create a function to change the speed of the cloud 
var setCloudSpeed = function(speed){
	for (var i=0; i<cloudArray.length; i++){
		cloudArray[i].pos.y += speed;
	}
}

// create a function that loops the cloud images whenever it goes off screen
var cloudLoopImg = function(cloud, minX, maxX){
	if (cloud.pos.y <= -100){
		cloud.pos.y = 540;
		cloud.pos.x = getRandomInt(minX, maxX);
		cloud.exploded = false;
	}
}

// create a function that increase players health when heart is obtained
function collisionHeart(heart){
	if (player.pos.x < heart.pos.x + 30 && 
		player.pos.x > heart.pos.x - 30 && 
		player.pos.y < heart.pos.y + 20 && 
		player.pos.y > heart.pos.y - 20){
		if(!heart.obtained){
			player.lifeCount = player.lifeCount + 1;
		}
		heart.disappear();
		setTimeout(function(){
	    	heart.obtained = false;
	    }, 2000);
	}	
}



// set the initial positions of the clouds and hearts
cloud2.setPos(100,1250);
cloud1.setPos(250,1000);
cloud3.setPos(400,1500);
cloud4.setPos(540, 2000);
heart.setPos(540,10);

// animate all the props
function animateProps(){
	gameContext.clearRect(0,0,800,540);
	// draw heart if it is not obtained 
	if (!heart.obtained){
		heart.draw();
	}
	// show the state of each cloud 
	for (var i=0; i<cloudArray.length; i++){
		if (!cloudArray[i].exploded){
			cloudArray[i].draw();
		}else{
			cloudArray[i].explode();
		}
	}
	// set the speed of each prop
	cloud1.pos.y -=4 + scrollSpeed;
	cloud2.pos.y -=5 + scrollSpeed;
	cloud3.pos.y -=6 + scrollSpeed;
	cloud4.pos.y -=5 + scrollSpeed;
	heart.pos.y -= 5 + scrollSpeed;

	// listen to up and downkey events then loop each cloud when offscreen
	if(gameOver == false){
		if (KEY.UP in keystate){
			setCloudSpeed(2);
		}else if (KEY.DOWN in keystate){
			setCloudSpeed(-2);
		};
		cloudLoopImg(cloud1, 60, 300);
		cloudLoopImg(cloud2, 330, 620);
		cloudLoopImg(cloud3, 60, 620);
		cloudLoopImg(cloud4, 60, 620);
		loopHeartImg(heart, 100, 620);
		gameAnimationId = requestAnimFrame(animateProps);
	}
	for (var i=0; i<cloudArray.length; i++){
		collisionCloud(cloudArray[i]);
	}
	collisionHeart(heart);
}




