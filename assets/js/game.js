 var buttonColors = ["red", "blue", "green", "yellow"];
 var gamePattern = [];
 var userClickedPattern = [];
 var level = 0;
 var started = true;


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

 function nextSequence() {
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
 });


 $(document).keydown(function (e) {
     if (started) {
         $("#level-title").text("Level " + level);
         nextSequence();
         started = false;
     }
 });