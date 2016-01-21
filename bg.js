var bgCanvas = document.getElementById("bgCanvas");
var bgContext = bgCanvas.getContext("2d");

// shim for requestAnimationFrame
window.requestAnimFrame = (function(){
		  return  window.requestAnimationFrame       ||
		          window.webkitRequestAnimationFrame ||
		          window.mozRequestAnimationFrame    ||
		          function( callback ){
		            window.setTimeout(callback, 1000 / 60);
		          };
		})();

KEYS = {LEFT:37, UP:38, RIGHT:39, DOWN:40}
keystate = {}
var bgImg = new Image();
bgImg.src = "img/bg.png";

// create player inputs
keystate = {}
document.body.addEventListener("keydown", function(evt){
	evt.preventDefault();
	keystate[evt.keyCode] = true;
});

document.body.addEventListener("keyup", function(evt){
	delete keystate[evt.keyCode]
});

var scrollIndex = 0
var scrollSpeed = 0;
function animate(){
	bgContext.clearRect(0, 0, 800, 540);
	if (KEYS.UP in keystate){
		scrollIndex -= 4;
	}
	if (KEYS.DOWN in keystate){
		scrollIndex += 5;
	}
	bgContext.drawImage(bgImg, 0, 0 - scrollIndex, 800, 540);
	bgContext.drawImage(bgImg, 0, 539 - scrollIndex, 800, 540);
	scrollIndex += 10 + scrollSpeed;
	if (scrollSpeed <= 3){
		scrollSpeed += 0.0005;
	}
	if (scrollIndex >= 540){
		scrollIndex = 0;
	}
	if(gameOver == false){
		bgAnimationId = requestAnimFrame(animate);
	}	
}

