// ------------------------- Binds ------------------------- //
$(document).ready(function(){
  generateGame();

  $(document).on("keypress", function(e){
    if ($(e.target).is(":text")){
      return;
    }

    if (e.key == 'a') {
      moveNeedle(-1);
    } else if (e.key == 'd') {
      moveNeedle(1);
    } else if (e.key == ' ') {
      openCloseScreen();
      return false;
    }
  });

  $("#join-game").on("submit", function(){
    var code = $(this).find(":text").val().replace(/\D/g,'');
    if (code){
      $(this).find(":text").val('').blur();
      joinGame(code);
    }

    return false;
  });

  $("#randomize-game").on("click", function(){
    generateGame();
    $(this).blur();
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
  var right_color_index = (card_index + card[0].length) % Wavelength.colors.length;

  if (left_color_index == right_color_index){
    right_color_index = (right_color_index + 1) % Wavelength.colors.length
  }

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
  var precode = MathUtils.cantorPair(percentage, card_index);
  var shift = MathUtils.sumDigits(precode) % 5;

  return parseInt(shiftString(precode.toString().padStart(5, "0"), shift));
}

function decodeGame(code){
  var shift = MathUtils.sumDigits(parseInt(code)) % 5;
  var precode = parseInt(shiftString(code.padStart(5, "0"), -1 * shift));
  var game = MathUtils.reverseCantorPair(precode);
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
  ["Divided", "Whole"],
  ["Weak", "Strong"],
  ["Not addictive", "Addictive"],
  ["Normal", "Weird"],
  ["Low-calorie", "High-calorie"],
  ["Guilty pleasure", "Openly love"],
  ["Guilty pleasure", "Actually just bad"],
  ["Worst household chore", "Best household chore"],
  ["Ugly man", "Beautiful man"],
  ["Rough", "Smooth"],
  ["Pointy", "Round"],
  ["Nature", "Nurture"],
  ["Unstable", "Stable"],
  ["Better hot", "Better cold"],
  ["Bad habit", "Good habit"],
  ["Bad advice", "Good advice"],
  ["Bad person", "Good person"],
  ["Bad movie", "Good movie"],
  ["Bad present", "Good present"],
  ["Bad superpower", "Good superpower"],
  ["Smells bad", "Smells good"],
  ["Not Huggable", "Huggable"],
  ["Quiet", "Loud"],
  ["Fruit", "Vegetable"],
  ["Optional", "Mandatory"],
  ["Temporary", "Permanent"],
  ["Messy food", "Clean food"],
  ["Normal greeting", "Weird greeting"],
  ["Normal thing to own", "Weird thing to own"],
  ["Dictatorship", "Democracy"],
  ["Forbidden", "Encouraged"],
  ["Feels bad", "Feels good"],
  ["Bad", "Good"],
  ["Good", "Evil"],
  ["Villain", "Hero"],
  ["Limited", "Infinite"],
  ["Informal event", "Formal event"],
  ["Dirty", "Clean"],
  ["Useless body part", "Useful body part"],
  ["Harmless", "Harmful"],
  ["Irrelevant", "Important"],
  ["Unethical", "Ethical"],
  ["Peaceful", "Warlike"],
  ["Unethical to eat", "Ethical to eat"],
  ["Safe", "Dangerous"],
  ["Plain", "Fancy"],
  ["True", "False"],
  ["Not art", "Art"],
  ["Commerce", "Art"],
  ["Popular", "Elitist"],
  ["Out of control", "Under control"],
  ["Small number", "Big number"],
  ["Dog name", "Cat name"],
  ["Science", "Pseudoscience"],
  ["Mental Activity", "Physical Activity"],
  ["Unreasonable phobia", "Reasonable phobia"],
  ["Low quality", "High quality"],
  ["Hard to sit on", "Easy to sit on"],
  ["Hard to find", "Easy to find"],
  ["Hard to use", "Easy to use"],
  ["Regular pet", "Exotic pet"],
  ["Neutral subject", "Controversial subject"],
  ["Straight", "Curvy"],
  ["General purpose", "Specific purpose"],
  ["Snack", "Food"],
  ["Artisanal", "Mass produced"],
  ["Sport", "Game"],
  ["Uncool", "Cool"],
  ["Basic", "Hipster"],
  ["Fantasy", "Science fiction"],
  ["Unhygienic", "Hygienic"],
  ["Old fashioned", "Avant garde"],
  ["Unpopular", "Popular"],
  ["Easy to kill", "Hard to kill"],
  ["Unpopular opinion", "Popular opinion"],
  ["Unpopular activity", "Popular activity"],
  ["Underrated", "Overrated"],
  ["Underrated skill", "Overrated skill"],
  ["Action Movie", "Adventure movie"],
  ["Waste of time", "Good use of time"],
  ["Cheap", "Expensive"],
  ["Stupid", "Brilliant"],
  ["Requires luck", "Requires skill"],
  ["Sad song", "Happy song"],
  ["Millenial", "Gen Z"],
  ["A sandwich", "Not a sandwich"],
  ["A salad", "Not a salad"]
]

Wavelength.colors = [
  "#1596d4",
  "#d95624",
  "#e1c231",
  "#e4bbc1",
  "#8a7c99",
  "#bbd2be",
  "#0e997b",
  "#dcded0"
]

// ------------------------- Math Stuff ------------------------- //
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

MathUtils.sumDigits = function(n){
  var sum = 0;
  while (n) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }

  return sum;
}

function shiftString(str, step) {
  var length = str.length;
  step = step % length;
  step = step < 0 ? length + step : step;
  if (!str || length === 1 || !step) {
      return str;
  }
  var reverseString = (str) => str.split('').reverse().join('');
  str = reverseString(str);
  var s1 = str.slice(0, step);
  var s2 = str.slice(step);

  return reverseString(s1) + reverseString(s2);
};
