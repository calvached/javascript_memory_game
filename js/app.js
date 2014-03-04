// #cards div p needs to have inner HTML set to the following inside when showing cards
// <i class="fa fa-camera-retro fa-5x"></i>
// fa is the generic font-awesome styling
// fa-5x is size of font-awesome font that will display nice in the grid which is already styled
// fa-camera-retro is just an example placeholder for this example
// see css/font-awesome.css and pick 10 styles (icons) for use in the game.

/*

ToDo:

- Initialize game board with 10 font icons (see above)
- All cards will be initially hidden with .hidden_card class applied to div
- Tie click event to showing a card
- When you show second card, check to see if they match.
	- If they do match leave them up, but grey out the font icon
	- If they do not match hide them again.

- Scoring, each click is a point.... The lower the score the better!
- Reset should completely re-initialize the game.

Looking for Game (Controller), Card (Model), and a View Object.
*/

var firstCard;
var secondCard;
 var cardArray = [ '<i class="fa fa-archive fa-5x"></i>',
      '<i class="fa fa-anchor fa-5x"></i>',
      '<i class="fa fa-gamepad fa-5x"></i>',
      '<i class="fa fa-superscript fa-5x"></i>',
      '<i class="fa fa-beer fa-5x"></i>',
      '<i class="fa fa-magic fa-5x"></i> ',
      '<i class="fa fa-gamepad fa-5x"></i>',
      '<i class="fa fa-cogs fa-5x"></i>',
      '<i class="fa fa-superscript fa-5x"></i>',
      '<i class="fa fa-keyboard-o fa-5x"></i>',
      '<i class="fa fa-archive fa-5x"></i>',
      '<i class="fa fa-bug fa-5x"></i>',
      '<i class="fa fa-bug fa-5x"></i>',
      '<i class="fa fa-bullseye fa-5x"></i>',
      '<i class="fa fa-cogs fa-5x"></i>',
      '<i class="fa fa-keyboard-o fa-5x"></i>',
      '<i class="fa fa-anchor fa-5x"></i>',
      '<i class="fa fa-bullseye fa-5x"></i>',
      '<i class="fa fa-magic fa-5x"></i> ',
      '<i class="fa fa-beer fa-5x"></i>'];

var Card = function(htmlC, par){
  this.htmlClass =  htmlC;
  this.parentId = par
}

var Board = function() {
  this.set_match = function(card){
    var parentId = card.parentId;
    $('#' + parentId).attr('class', 'match');
  }
  this.toggleCard = function(card) {
    $('#' + card.parentId + " i").toggle();
  }
  this.adjustScore = function() {
    var currentScore = parseInt($('#score').text());
    $('#score').text(currentScore + 1);
  }

  this.reset = function(){
    $('.match').toggle('bounce', {time: 5}, 1500);
    $('.hidden_card').toggle('bounce', {time: 5}, 1500);
    $('.match').attr('class', 'hidden_card');
    this.placeCards();
    $('i').hide();
    $('.hidden_card').toggle('bounce', {time: 5}, 1500);
    $('#score').text(0);
  }

  this.printScore = function(score) {
    $("#score-board").append("<h3> Score: " + score + "!!!</h3>")
  }

  this.shuffler = function(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  this.isFinished = function() {
    if ($('.hidden_card').length === 0) {
      this.printScore($('#score').text());
    }
  }

  this.placeCards = function() {
    var shuffledCards = this.shuffler(cardArray);
    for (var i = 0; i< shuffledCards.length; i++) {
      $($('.hidden_card p')[i]).html(shuffledCards[i]);
    }
  }
}


$(function(){

  var board = new Board();
  board.placeCards();
  $('i').hide();

  $('input').on('click', function() {
    board.reset();
  })

  $(document).on('click', '.hidden_card', function() {
    board.adjustScore();
    $(this.firstChild.firstChild).toggle();
    if (firstCard) {
      firstParent = $('#' + firstCard.parentId)
      $('#' + firstCard.parentId).effect("transfer", {to: $(this) }, 1000)
      secondCard = new Card($(this.firstChild.firstChild).context.className, $(this).attr("id"));

      if (firstCard.htmlClass === secondCard.htmlClass && firstCard.parentId !== secondCard.parentId) {
       board.set_match(firstCard);
       board.set_match(secondCard);
      }
      else {
        setTimeout(function(){
          board.toggleCard(firstCard);
          board.toggleCard(secondCard);
        },150);
      }

      setTimeout(function(){
        firstCard = undefined;
        secondCard = undefined;
      },200)
    }
    else {
      firstCard = new Card($(this.firstChild.firstChild).context.className, $(this).attr("id"));
    }
    board.isFinished();
  });
});
