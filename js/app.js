// ------------------------- Binds ------------------------- //
$(document).ready(function(){
  $("#generate-game").on("click", function(){
    hideMenu();
    generateGame();
  });

  $(document).on("keypress", function(e){
    if (e.originalEvent.key == 'a') {
      moveNeedle(-1);
    } else if (e.originalEvent.key == 'd') {
      moveNeedle(1);
    }
  })
});

// ------------------------- Dom Control ------------------------- //
function hideMenu(){
  $("#menu").hide();
}

function displayGame(percentage, card){
  displayDial(percentage)
  displayCard(card)
  $("#game-container").show();
}

function displayDial(percentage){
  var min_angle = -105;
  var max_angle = 69; // nice

  var angle = (max_angle - min_angle) * percentage / 100 + min_angle;
  $("#dial").css("rotate", angle + "deg");
}

function displayCard(card){
  var left_color_index = Math.floor(Math.random() * Colors.length);
  do {
    var right_color_index = Math.floor(Math.random() * Colors.length);
  } while (left_color_index == right_color_index);




  $("#card-left").text(card[0]).css("background-color",Colors[left_color_index]);
  $("#card-right").text(card[1]).css("background-color",Colors[right_color_index]);

}

// ------------------------- Game Logic ------------------------- //
function generateGame(){
  var percentage = Math.floor(Math.random() * 101);
  var card_index = Math.floor(Math.random() * Cards.length);

  displayGame(percentage, Cards[card_index]);
}

function moveNeedle(direction){
  var angle = parseInt($("#dial-needle").css("rotate"));
  angle += direction;

  $("#dial-needle").css("rotate", angle + "deg");
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
  ["Bad pizza topping", "Good pizza topping"],
  ["Useless invention", "Useful invention"],
  ["Dark", "Light"],
  ["Guilty pleasure", "Openly love"],
  ["Ugly man", "Beautiful man"],
]

var Colors = [
  "#1596d4",
  "#d95624",
  "#6d739a",
  "#0d7c74",
  "#e4c0c8",
  "#e1c231"
]
