// ------------------------- Binds ------------------------- //
$(document).ready(function(){
  $("#generate-game").on("click", function(){
    hideMenu();
    generateGame();
  });
});

// ------------------------- Dom Control ------------------------- //
function hideMenu(){
  $("#menu").hide();
}

// -105deg -- 69deg

function displayGame(percentage, card){
  displayDial(percentage)
  displayCard(card)
  $("#game-container").show();
}

function displayDial(percentage){
  var  min_angle = -105;
  var max_angle = 69; // nice

  var angle = (max_angle - min_angle) * percentage / 100 + min_angle;
  $("#dial").css("rotate", angle + "deg");
}

function displayCard(card){
  $("#card-left").text(card[0]);
  $("#card-right").text(card[1]);
}

// ------------------------- Game Logic ------------------------- //
function generateGame(){
  var percentage = Math.floor(Math.random() * 101);
  var cardIndex = Math.floor(Math.random() * Cards.length);

  displayGame(percentage, Cards[cardIndex]);
}

// ------------------------- Game Data ------------------------- //
var Cards = [
  ["Cold", "Hot"],
  ["Little known fact", "Well known fact"],
  ["Unforgivable crime", "Forgivable crime"],
  ["Rare", "Common"],
  ["Tastes bad", "Tastes good"],
  ["Unsexy emoji", "Sexy emoji"],
  ["Uncool", "Cool"],
]
