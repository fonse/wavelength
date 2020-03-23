// ------------------------- Binds ------------------------- //
$(document).ready(function(){
  $("#generate-game").on("click", function(){
    hideMenu();
    generateGame();
  });

  $(document).on("keypress", function(e){

    if (e.key == 'a') {
      moveNeedle(-1);
    } else if (e.key == 'd') {
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
  var left_color_index = MathUtils.random(Colors.length);
  do {
    var right_color_index = MathUtils.random(Colors.length);
  } while (left_color_index == right_color_index);

  $("#card-left").text(card[0]).css("background-color",Colors[left_color_index]);
  $("#card-right").text(card[1]).css("background-color",Colors[right_color_index]);

}

// ------------------------- Game Logic ------------------------- //
function generateGame(){
  var percentage = MathUtils.random(101);
  var card_index = MathUtils.random(Cards.length);

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
  ["A sandwich", "Not a sandwich"],
]

var Colors = [
  "#1596d4",
  "#d95624",
  "#6d739a",
  "#0d7c74",
  "#e4c0c8",
  "#e1c231"
]

// ------------------------- Math Stuff Data ------------------------- //
var MathUtils = {};

MathUtils.random = function(n){
  return Math.floor(Math.random() * n);
}

MathUtils.cantorPair = function(x, y) {
    var z = ((x + y) * (x + y + 1)) / 2 + y;
    return z;
}

MathUtils.reverseCantorPair = function(z){
    var pair = [];
    var t = Math.floor((-1 + Math.sqrt(1 + 8 * z))/2);
    var x = t * (t + 3) / 2 - z;
    var y = z - t * (t + 1) / 2;
    pair[0] = x;
    pair[1] = y;
    return pair;
}
