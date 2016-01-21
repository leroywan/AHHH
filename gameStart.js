
var gameStartContainer = document.getElementById("gameStartContainer");
var startButton = document.getElementById("gameStart");
var aboutButton = document.getElementById("about");
var titleImg = document.getElementById("gameTitle");

// Start all animation when start is clicked
startButton.onclick = function(){
	// create transition effects to buttons
	gameStartContainer.style.backgroundColor = "black";
	startButton.style.color = "yellow";
	startButton.style.backgroundColor = "black";
	// wait for transition effects to take place then start animatinos
	setTimeout(function(){
		titleImg.style.display = "none";
		gameStartContainer.style.display = "none";
		playerAnimationId = requestAnimFrame(update);
		bgAnimationId = requestAnimFrame(animate);
		gameAnimationId = requestAnimFrame(animateProps);
		requestAnimFrame(loop);
	}, 3000);
}


