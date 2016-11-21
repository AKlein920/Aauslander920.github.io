console.log('buttons file');

$(function() {

  // grabbing buttons:
  var $newGameBtn = $('#new-game');
  var $hitBtn = $('#hit');
  var $stayBtn = $('#stay');

  // grabbing player cards:
  var $pCardOne = $('#p-card-one');
  var $pCardTwo = $('#p-card-two');

  // event handler for new game button:
  var newGameFunction = function() {
    var showCard = Math.floor(Math.random() * this.cards.length);

    // for (var i = 0; i < this.cards.length; i++) {
    //
    //   $pCardOne.text(this.cards[i].suit + this.cards[i].value);
    // }
    return showCard;

  }
console.log(hitFunction());
// event listener on hit button:

  // $hitBtn.on('click', someFunction() {
  // });







})
