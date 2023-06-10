var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var levelCount = 0;
var started = false;

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);

  playAudio(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickPattern.length - 1);
});

$("html").keypress(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    console.log("success");

    if (userClickPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    // console.log("wrong");
    gameOver();
  }
}

function nextSequence() {
  userClickPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // console.log(gamePattern);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  levelCount++;
  $("#level-title").text("Level " + levelCount);

  playAudio(randomChosenColour);
}

// function for animatinting clicks

function animatePress(currentColor) {
  var currentClass = "." + currentColor;
  $(currentClass).addClass("pressed");
  setTimeout(() => {
    $(currentClass).removeClass("pressed");
  }, 40);
}

//function to play audio

function playAudio(Ccolor) {
  var audio = new Audio("sounds/" + Ccolor + ".mp3");
  audio.play();
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 100);

  var audio = new Audio("sounds/wrong.mp3");
  audio.play();

  $("h1").text("Wrong, Press any key to Re Start.");
  startOver();
}

function startOver() {
  gamePattern = [];
  userClickPattern = [];
  levelCount = 0;
  started = false;

  $("html").keypress(function () {
    if (!started) {
      nextSequence();
      started = true;
    }
  });
}
