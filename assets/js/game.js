 var buttonColors = ["red", "blue", "green", "yellow"];
 var gamePattern = [];
 var userClickedPattern = [];
 var level = 0;
 var started = true;


var startOver = function (){
    started = true;
    level = 0;
    gamePattern = [];
};

 var buttonSound = function (randomChosenColour) {
     // Play sound of corresponding button.
     switch (randomChosenColour) {
         case "red":
             var redAudio = new Audio("assets/sounds/red.mp3");
             redAudio.play();
             break;
         case "blue":
             var blueAudio = new Audio("assets/sounds/blue.mp3");
             blueAudio.play();
             break;
         case "green":
             var greenAudio = new Audio("assets/sounds/green.mp3");
             greenAudio.play();
             break;
         default:
             var yellowAudio = new Audio("assets/sounds/yellow.mp3");
             yellowAudio.play();
             break;
     }
 };

 var animatePress = function (currentColor) {
     // Create a delay for when a button is pressed.
     $("#" + currentColor).addClass("pressed");

     setTimeout(function () {
         $("#" + currentColor).removeClass("pressed");
     }, 100);

 };

 function checkAnswer(currentLevel) {
     if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
         // Check if user has finished their sequence.
         if (userClickedPattern.length === gamePattern.length) {

             //5. Call nextSequence() after a 1000 millisecond delay.
             setTimeout(function () {
                 nextSequence();
             }, 1000)

         }
     } else {
         // Play this sound if the user got one of the answers wrong.
         var wrongAudio = new Audio("assets/sounds/wrong.mp3");
         wrongAudio.play();
         //  apply this class to the body of the website when the user gets one of
         //  the answers wrong and then remove it after 200 milliseconds.
         $("body").addClass("game-over");

         setTimeout(() => {
             $("body").removeClass("game-over");
         }, 200);

         $("#level-title").text("Game Over, Press Any Key to Restart");
         startOver();
     }
 }

 function nextSequence() {
     //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
     userClickedPattern = [];
     level++;
     $("#level-title").text("Level " + level);
     // Generate a random number between 0 - 3
     var randomNumber = Math.floor(Math.random() * 4);
     var randomChosenColour = buttonColors[randomNumber];
     // Add random color selection to an array.
     gamePattern.push(randomChosenColour);
     // Play random animation and sound.
     $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
     buttonSound(randomChosenColour);
 };

 $(".btn").on("click", function () {
     // Get color name for pressed button.
     var userChosenColour = $(this).attr("id");
     userClickedPattern.push(userChosenColour);

     // Play animation and sound for pressed button.
     buttonSound(userChosenColour);
     animatePress(userChosenColour);

     // Check answer from user.
     checkAnswer(userClickedPattern.length - 1);

 });


 $(document).keydown(function () {
     if (started) {
         $("#level-title").text("Level " + level);
         nextSequence();
         started = false;
     }
 });