$(function() {

  console.log('deck file');

  //empty array to hold cards in play:
  var cardsInPlay = [];

  // grabbing buttons:
  var $newGameBtn = $('#new-game');
  var $hitBtn = $('#hit');
  var $stayBtn = $('#stay');

  // grabbing player & dealer tallies:
  var $dealerTally = $('#dealer-tally');
  var $playerTally = $('#player-tally');

  // grabbing player & dealer cards:
  var $pCardOne = $('#p-card-one');
  var $pCardTwo = $('#p-card-two');
  var $pCardThree = $('#p-card-three');
  var $pCardFour = $('#p-card-four');
  var $pCardFive = $('#p-card-five');

  var $dCardOne = $('#d-card-one');
  var $dCardTwo = $('d-card-two');

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
     var $allPlayerCards = $('.player-card');
     $allPlayerCards.text('');
     // pick cards out of the deck to display:

    if (makeDeck.cards.length > 0) {
      var pCardOne = makeDeck.cards.pop();
      var pCardTwo = makeDeck.cards.pop();
      var dCardOne = makeDeck.cards.pop();
      var dCardTwo = makeDeck.cards.pop();
      cardsInPlay.push(pCardOne, pCardTwo, dCardOne, dCardTwo);
    }
      // else, if original deck has no cards, need to build a NEW deck here.
    // put their text into card divs:
    $pCardOne.text(pCardOne.face + pCardOne.value);
    $pCardTwo.text(pCardTwo.face + pCardTwo.value);
    $dCardOne.text(dCardOne.face + dCardOne.value);

    // tally & display dealer & player scores:
    playerVals = pCardOne.value + pCardTwo.value;
    $playerTally.text('Current score: ' + playerVals);

    dealerVals = dCardOne.value + dCardTwo.value;
    $dealerTally.text('');
} // end of new game button event handler


  // event listener for new game button:
  $newGameBtn.on('click', dealRandomCards);

  // event handler for hit me button:
  var hitMe = function() {
    var nextCard = makeDeck.cards.pop();
    cardsInPlay.push(nextCard);

    if ($pCardThree.is(':empty')) {
      $pCardThree.text(nextCard.face + nextCard.value);
      playerVals += nextCard.value;
    } else if ($pCardFour.is(':empty')) {
      $pCardFour.text(nextCard.face + nextCard.value);
      playerVals += nextCard.value;
    } else if ($pCardFive.is(':empty')) {
      $pCardFive.text(nextCard.face + nextCard.value);
      playerVals += nextCard.value;
    }

    $playerTally.text('Current score: ' + playerVals);
    console.log(cardsInPlay);
  } // end of hit me button event handler

  // event listener for hit me button:
  $hitBtn.on('click', hitMe);

  // event handler for stay function:
  var stay = function() {



  }

}); // end of window onload jquery functions
