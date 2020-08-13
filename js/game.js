var buttonColours = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var newGame = true;
var level = 0;
function nextSequence() {

  //create a random number between 0 - 3
  var randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(randomChosenColour);
  playSound(randomChosenColour);

  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
     $("body").removeClass("game-over");



  //$("#someElement").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#" + randomChosenColour + "").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  level ++;
  // //show the level on h1
$("#level-title").text ("Level "+level)
}

function playSound(colour) {

  var soundToPlay = new Audio("sounds/" + colour + ".mp3");
  // console.log("play: "+colour);
  soundToPlay.play();

}

//listen for button clicks
//$(".btn").click(function(){alert("clicked this:"+this[0]);});
$(".btn").click(function(myButton) {
  // alert (myButton.target.id);
  //call the handler method
  var colour = myButton.target.id;
  handleButton(colour);
  //ANGELA DID IT THIS WAY:
  //var userChosenColour = $(this).attr("id");

  animatePress(colour);
 //call check Answer passing in the index of the  last answer
 checkAnswer((userClickedPattern.length -1));

});

//listen for keyboard presses on the body someElement
$("body").keydown(function(){
    // do something
    //alert("pressed");

    //call nextSequence if new game
 if (newGame === true) {
console.log (newGame);
     nextSequence();
     newGame = false;



     // $("#level-title").text ("Press Any Key");
 }

 else if (newGame === false) {
   // level ++;

   nextSequence();

 }

  });


function handleButton(colour) {
  //alert("myHandler:" + colour);
  var userChosenColour=colour;
  //add the chosen colour to the array
  userClickedPattern.push(colour);

  //play sounds
  playSound(colour);

}


function animatePress(colour){
  // $("#"+colour+"").fadeOut(100).fadeIn(100);
    $("#"+colour+"").addClass("pressed");

    setTimeout (function(){
        $("#"+colour+"").removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      //display game over and assign the game over class to body
      $("body").addClass("game-over");
      playSound("wrong");
      $("#level-title").text("Game Over,  Press any key to restart");
      startOver();


    }

    function startOver(){
      gamePattern=[];
      level=0;
      newGame=true;


    }

}
