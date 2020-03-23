// ------------------------- Binds ------------------------- //
$(document).ready(function(){
  generateGame();

  $(document).on("keypress", function(e){
    if (e.key == 'a') {
      moveNeedle(-1);
    } else if (e.key == 'd') {
      moveNeedle(1);
    } else if (e.key == ' ') {
      openCloseScreen();
    }
  });

  $("#open-close-screen").on("click", function(){
    openCloseScreen();
  });

  $("#join-game").on("submit", function(){
    var code = $(this).find(":text").val();
    if (code){
      $(this).find(":text").val('');
      joinGame(code);
    }

    return false;
  });

  $("#randomize-game").on("click", function(){
    generateGame();
  });
});

// ------------------------- DOM Control ------------------------- //
function displayGame(percentage, card_index, code){
  displayDial(percentage)
  displayCard(card_index)
  $("#game-code").text(code);
}

function displayDial(percentage){
  var min_angle = -105;
  var max_angle = 69; // nice

  var angle = (max_angle - min_angle) * percentage / 100 + min_angle;
  $("#dial").css("transform", "rotate(" + angle + "deg)");
}

function displayCard(card_index){
  var card = Wavelength.cards[card_index];

  var left_color_index = card_index % Wavelength.colors.length;
  var right_color_index = (card_index + 1) % Wavelength.colors.length;

  $("#card-left").text(card[0]).css("background-color", Wavelength.colors[left_color_index]);
  $("#card-right").text(card[1]).css("background-color", Wavelength.colors[right_color_index]);
}

// ------------------------- Game Logic ------------------------- //
function generateGame(){
  var percentage = MathUtils.random(101);
  var card_index = MathUtils.random(Wavelength.cards.length);
  var code = encodeGame(percentage, card_index);

  displayGame(percentage, card_index, code);
  openScreen();
}

function joinGame(code){
  var decodedGame = decodeGame(code);

  closeScreen();
  setTimeout(function(){
      displayGame(decodedGame[0], decodedGame[1], code);
  }, 1000);
}

function moveNeedle(direction){
  var angle = Wavelength.state.needle + direction;
  Wavelength.state.needle = Math.min(88, Math.max(-88, angle));

  $("#dial-needle").css("transform", "rotate(" + Wavelength.state.needle + "deg)");
}

function openCloseScreen(){
  if (Wavelength.state.screenClosed){
    openScreen();
  } else {
    closeScreen();
  }
}

function openScreen(){
  $("#dial-cover").css("transform", "rotate(135deg)");
  Wavelength.state.screenClosed = false;
}

function closeScreen(){
  $("#dial-cover").css("transform", "rotate(-45deg)");
  Wavelength.state.screenClosed = true;
}

function encodeGame(percentage, card_index){
  return MathUtils.cantorPair(percentage, card_index);
}

function decodeGame(code){
  var game = MathUtils.reverseCantorPair(code);
  game[1] = game[1] % Wavelength.cards.length;

  return game;
}

// ------------------------- Game Data ------------------------- //
var Wavelength = {}

Wavelength.state = {
  needle: 0,
  screenClosed: false
}

Wavelength.cards = [
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
  ["Soft", "Hard"],
  ["Short", "Long"],
  ["Dry", "Wet"],
  ["Weak", "Strong"],
  ["Guilty pleasure", "Openly love"],
  ["Ugly man", "Beautiful man"],
  ["Rough", "Smooth"],
  ["Pointy", "Round"],
  ["Better hot", "Better cold"],
  ["Bad habit", "Good habit"],
  ["Bad advice", "Good advice"],
  ["Bad person", "Good person"],
  ["Bad etiquette", "Good etiquette"],
  ["Bad superpower", "Good superpower"],
  ["Quiet place", "Loud place"],
  ["Temporary", "Permanent"],
  ["Normal greeting", "Weird greeting"],
  ["Normal thing to own", "Weird thing to own"],
  ["Dictatorship", "Democracy"],
  ["Forbidden", "Encouraged"],
  ["Bad", "Good"],
  ["Good", "Evil"],
  ["Plain", "Fancy"],
  ["Low quality", "High quality"],
  ["Unccool", "Cool"],
  ["Unpopular", "Popular"],
  ["Underrated", "Overrated"],
  ["Bad movie", "Good movie"],
  ["Waste of time", "Good use of time"],
  ["Cheap", "Expensive"],
  ["Stupid", "Brilliant"],
  ["Requires luck", "Requires skill"],
  ["Sad song", "Happy song"],
  ["A sandwich", "Not a sandwich"],
  ["A salad", "Not a salad"]
]

Wavelength.colors = [
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
