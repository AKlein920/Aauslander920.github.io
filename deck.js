$(function() {

  console.log('deck file');

// player object
var player = {
  pHand: [],
  pBank: 100
}

// dealer object
var dealer = {
  dHand: [],
  dBank: 100
}

  // grabbing buttons:
  var $newGameBtn = $('#new-game');
  var $hitBtn = $('#hit');
  var $stayBtn = $('#stay');

  // grabbing player & dealer containers:
  $pHandContainer = $('#player-hand-container');
  $dHandContainer = $('#dealer-hand-container');

  // grabbing player & dealer tallies:
  var $dealerTally = $('#dealer-tally');
  var $playerTally = $('#player-tally');

  // grabbing player text box:
  var $playerText = $('#player-text');

  // object constructor to make each new card:
  var Card = function(suit, value, face) {
    this.suit = suit;
    this.face = face;
    this.value = value;
  }

  //  object to make/contain the deck:
  var makeDeck = {
    // empty array to hold cards:
    cards: [],
    suits: ['diamonds', 'hearts', 'spades', 'clubs'],
    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    faces: ['♦', '♥', '♠', '♣'],

    // write a method to make the numbers:
    makeNum: function() {
      for (var i = 0; i < this.suits.length; i++) {
        for (var j = 0; j < this.values.length; j++) {
          var eachNum = new Card(this.suits[i], this.values[j]);
          this.cards.push(eachNum);
          }
        }
      },

    // write a method to make the face cards:
    makeFace: function() {
      var faceCards = ['jack', 'queen', 'king'];
      for (var k = 0; k < this.suits.length; k++) {
        for (var l = 0; l < faceCards.length; l++) {
          var eachFace = new Card(this.suits[k], 10);
          this.cards.push(eachFace);
        }
      }
    },

   // write method to assign unicode characters to cards:
   assignChar: function() {
     for (var m = 0; m < this.cards.length; m++) {
       if (this.cards[m].suit == 'diamonds') {
         this.cards[m].face = this.faces[0];
       } else if (this.cards[m].suit == 'hearts') {
         this.cards[m].face = this.faces[1];
       } else if (this.cards[m].suit == 'spades') {
         this.cards[m].face = this.faces[2];
       } else if (this.cards[m].suit == 'clubs') {
         this.cards[m].face = this.faces[3];
       }
     }
   },
// experimenting with shuffle function to make life easier: (Fisher-Yates shuffle)
   shuffle: function() {
     var i = 0;
     var j = 0;
     var temp = null;

       for (i = makeDeck.cards.length - 1; i > 0;  i-=1) {
         j = Math.floor(Math.random() * (i + 1));
         temp = makeDeck.cards[i];
         makeDeck.cards[i] = makeDeck.cards[j];
         makeDeck.cards[j] = temp;
       }
   }
 } //end of deck object

// calling fucntions from makeDeck to create cards and shuffle deck:
  makeDeck.makeNum();
  makeDeck.makeFace();
  makeDeck.assignChar();
  makeDeck.shuffle();

  // event handler for new game button:
   var dealRandomCards = function() {
     player.pHand = [];
     dealer.dHand = [];
     // pick cards out of the deck to display:
    if (makeDeck.cards.length > 0) {
      var pCardOne = makeDeck.cards.pop();
      var pCardTwo = makeDeck.cards.pop();
      var dCardOne = makeDeck.cards.pop();
      player.pHand.push(pCardOne, pCardTwo);
      dealer.dHand.push(dCardOne);
    }
      // else, if original deck has no cards, need to build a NEW deck here.

    // iterate over the pHand array, create a new div with each pHand element info, append to body in player spot.

    for (var i = 0; i < player.pHand.length; i++) {
      var pCardValue = player.pHand[i].value;
      var pCardFace = player.pHand[i].face;
      var $pCard = $('<div>');
      $pCard.text(pCardValue + pCardFace);
      $pCard.addClass('player-card');
      $pHandContainer.append($pCard);
    }

    var playerVals = 0;
    for (var j = 0; j < player.pHand.length; j++) {
      playerVals = playerVals + player.pHand[j].value;
    }

    $playerText.text('Current score: ' + playerVals);

    for (var k = 0; k < dealer.dHand.length; k++) {
      var dCardValue = dealer.dHand[k].value;
      var dCardFace = dealer.dHand[k].face;
      $dCard = $('<div>');
      $dCard.text(dCardValue + dCardFace);
      $dCard.addClass('dealer-card');
      $dHandContainer.append($dCard);
    }

    var dealerVals = 0;
    for (var l = 0; l < dealer.dHand.length; l++) {
      dealerVals = dealerVals + dealer.dHand[l].value;
    }
    console.log(dealerVals);

    $newGameBtn.hide();
    $hitBtn.show();
    $stayBtn.show();
} // end of new game button event handler

  // event listener for new game button:
  $newGameBtn.on('click', dealRandomCards);
  // event handler for hit me button:
  var hitMe = function() {
    var nextCard = makeDeck.cards.pop();
    player.pHand.push(nextCard);
    $pNextCard = $('<div>');
    $pNextCard.text(nextCard.value + nextCard.face);
    $pNextCard.addClass('player-card');
    $pHandContainer.append($pNextCard);

    var currentPlayerVals = 0;
    for (var i = 0; i < player.pHand.length; i++) {
      currentPlayerVals = currentPlayerVals + player.pHand[i].value;
    }
    $playerText.text('Current score: ' + currentPlayerVals);

    if (currentPlayerVals > 21) {
      $playerText.text('Current score: ' + currentPlayerVals + ' Bust! Click New Game to play again');
      $hitBtn.hide();
      $stayBtn.hide();
      $newGameBtn.show();
      var $playerCards = $('.player-card');
      var $dealerCards = $('.dealer-card');
      $playerCards.remove();
      $dealerCards.remove();
    }

} // end of hit me button event handler

  // event listener for hit me button:
  $hitBtn.on('click', hitMe);

  // event handler for stay function:
  var stay = function() {
    console.log(dealerVals);

    $dCardTwo.text(dCardTwo.face + dCardTwo.value);

    if (dealerVals >= 17) {
      var dNextCard = makeDeck.cards.pop();
      dHand.push(dNextCard);

      $dCardThree.text(dNextCard.face + dNextCard.value);
      dealerVals += nextCard.value;
      $dealerTally.show();
      $dealerTally.text('Current score: ' + dealerVals);
    }

  }

  // event listener for stay button:
  $stayBtn.on('click', stay);

}); // end of window onload jquery functions
