var level = 0;

var started = false;
if( level === 0) {
  $("h1").text("Press A key to Start");
}
$(document).on("keydown", function(){
  if(!started) {
    nextSequence();
    started = true;
  }
});

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function playSound(name) {
  var audio = new Audio("./sounds/"+name+".mp3");
  audio.play();
}

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

  //Play ausio for chosen buttonColour
  playSound(randomChosenColour);
  // var audio = new Audio(randomChosenColour+".mp3");
  // audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function checkAnswer(currentLevel) {
  if( userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

$(".btn").on("click", function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

function animatePress(currentColour) {
  $("#"+ currentColour).addClass("pressed");
  setTimeout(function() {
    $("#"+ currentColour).removeClass("pressed");
  }, 100);
}
