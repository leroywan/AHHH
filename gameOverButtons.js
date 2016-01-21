
var tryAgainButton = document.getElementById("tryAgain");

// when try again is clicked, reset all properties and restart animation
tryAgainButton.onclick = function(){
	gameOver = false;
	player.setPos(375, 245);
	player.direction = {left:false, right:false, up:false, down:false};
	player.speed = 1;
	player.distance = 0;
	player.oFace = false;
	player.scaredFace = false;
	player.excitedFace = false;
	player.lifeCount = 5;
	forceY = 0;
	forceX = 0;
	for (var i=0; i<cloudArray.length; i++){
		cloudArray[i].exploded = false;
	}
	cloud2.setPos(100,1250);
	cloud1.setPos(250,1000);
	cloud3.setPos(400,1500);
	cloud4.setPos(540, 2000);
	gameOverContainer.style.display = "none";
	requestAnimFrame(loop);
	requestAnimFrame(animate);
	requestAnimFrame(animateProps);
	requestAnimFrame(update);
}