var aboutButton = document.getElementById("about");
var gameStartContainer = document.getElementById("gameStartContainer");
var startButton = document.getElementById("gameStart");
var gameTitle = document.getElementById("gameTitle");
var heartInfo = document.getElementById("heart_info");
var controls = document.getElementById("controls");
var aboutInfo = document.getElementById("about_info");

var buffer = function(){
	setTimeout(function(){
		clickBuffer = false;
	},2200);
}
clickBuffer = false;
aboutButton.onclick = function(){
	if(clickBuffer == false){
		if(gameStartContainer.style.background == "black"){
			clickBuffer = true;
			aboutInfo.style.display = "none";
			aboutButton.style.color = "black";
			gameStartContainer.style.background = "white";
			aboutButton.style.border = "2px solid black";
			startButton.style.border = "2px solid black";

			aboutButton.innerText = "About";
			buffer();
			setTimeout(function(){
				gameTitle.style.display = "block";
				heartInfo.style.display = "block";
				controls.style.display = "block";
			},2000);
		}else{
			clickBuffer = true;
			aboutInfo.style.display = "block";
			gameStartContainer.style.background = "black"; 
			aboutButton.style.border = "2px solid white";
			aboutButton.style.color = "white";
			aboutButton.style.zIndex = "300000";
			aboutButton.style.top = "30px";
			aboutButton.style.left = "30px";
			aboutButton.innerText = "Back";
			aboutButton.style.padding = "15px";
			gameTitle.style.display = "none";
			heartInfo.style.display = "none";
			controls.style.display = "none";
			buffer();
		}
	}
}