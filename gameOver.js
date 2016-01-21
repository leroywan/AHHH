var gameOverCanvas = document.getElementById("gameOverCanvas");
var gameOverContext = gameOverCanvas.getContext('2d');
var gameOverContainer = document.getElementById("gameOverContainer");
var gameOverButton = document.getElementById("gameOver");
var tryAgainButton = document.getElementById("tryAgain");

// initialize game over image
gameOverImg = new Image();
gameOverImg.src = "img/gameOverSquares.png";

gameOver = false;
// create animation when player life is 0
function loop(){
	if (player.lifeCount <= 0){
		gameOver = true;
		player.scaredFace = true;
		forceY = 10;
		player.move.down();
		// stop all animation when player position is off screen
		if(player.pos.y > 540){
			setTimeout(function(){
				gameOverContainer.style.display = "block";
				gameOverButton.style.animationPlayState = "start";
				tryAgainButton.style.animationPlayState = "start";
				cancelAnimationFrame(gameAnimationId);
				cancelAnimationFrame(playerAnimationId);
				cancelAnimationFrame(bgAnimationId);
				cancelAnimationFrame(gameOverAnimationId);
			}, 500)
		}
	}
	gameOverAnimationId = requestAnimFrame(loop);
}


