// collect data
var buttonColours = ["red", "blue", "green", "yellow"];
// user click collect
var userClickedPattern = [];
var gamePattern = [];
//level game
var level = 0;
var start = false;

function nextSequence() {
	//increase when call nextSequence
	level++;

	$("#level-title").text("Level " + level);
	var randomNumner = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randomNumner];
	gamePattern.push(randomChosenColour);
	animatePress(randomChosenColour);
	//playSound(randomChosenColour);
}

/*-- keydown for call nextSequence--*/
$(document).keydown(function (e) {
	if (!start && e.key === "a") {
		$("#level-title").text("Level 0");
		nextSequence();
		start = true;
	}
});
/* -- end of keydown for call nextSequence -- */

/* -- click listerner -- */
$(".btn").click(function (e) {
	//collect color user clicked
	var userChosenColour = e.target.id;
	userClickedPattern.push(userChosenColour);
	playSound(e.target.id);
	animatePress(e.target.id);
	checkAnswer(userClickedPattern.length - 1);
});
/* -- end of click listerner -- */

/* -- play sound -- */
function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}
/* -- end of play sound --*/

/* animation when user click*/
function animatePress(currentColour) {
	$("#" + currentColour).addClass("pressed");
	//delay
	var delayInMilliseconds = 100;
	setTimeout(function () {
		$("#" + currentColour).removeClass("pressed");
	}, delayInMilliseconds);
	//end of delay
}

/* -- end of animation when user click --*/

/* -- check answer -- */
function checkAnswer(userclick) {
	if (userClickedPattern[userclick] === gamePattern[userclick]) {
		if (gamePattern.length === userClickedPattern.length) {
			userClickedPattern = [];
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		$("#level-title").html("Game Over!! <br>press r to restart");
		gameOver();
		gamePattern = [];
		userClickedPattern = [];

		$(document).keydown(function (e) {
			if (e.key === "r") {
				level = 0;
				$("#level-title").text("Level 0");
				setTimeout(function () {
					nextSequence();
				}, 1000);
			}
		});
	}
}
/* -- end of check answer -- */

/* animation when user click*/
function gameOver() {
	$("body").addClass("game-over");
	//delay
	var delayInMilliseconds = 100;
	setTimeout(function () {
		$("body").removeClass("game-over");
	}, delayInMilliseconds);
	//end of delay
}

/* -- end of animation when user click --*/
