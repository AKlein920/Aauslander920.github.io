$(function() {

  console.log('deck file');
  // grabbing buttons:

  //empty array to hold cards in play:
  var cardsInPlay = [];

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
    //  console.log(this.cards);
   }

 } //end of deck object

  makeDeck.makeNum();
  makeDeck.makeFace();
  makeDeck.assignChar();


  // event handler for new game button:
   var dealRandomCards = function() {
     // pick cards out of the deck at random to display:
     var pCardOne = makeDeck.cards[Math.floor(Math.random() * makeDeck.cards.length)];
     var pCardTwo = makeDeck.cards[Math.floor(Math.random() * makeDeck.cards.length)];
     var dCardOne = makeDeck.cards[Math.floor(Math.random() * makeDeck.cards.length)];
     var dCardTwo = makeDeck.cards[Math.floor(Math.random() * makeDeck.cards.length)];

    // take them from cards array:
    makeDeck.cards.splice(pCardOne, 1);
    makeDeck.cards.splice(pCardTwo, 1);
    makeDeck.cards.splice(dCardOne, 1);
    makeDeck.cards.splice(dCardTwo, 1);

    // push them into empty cardsInPlay array:
    cardsInPlay.push(pCardOne, pCardTwo, dCardOne, dCardTwo);

     // put their text into card divs:
     $pCardOne.text(pCardOne.face + pCardOne.value);
     $pCardTwo.text(pCardTwo.face + pCardTwo.value);
     $dCardOne.text(dCardOne.face + dCardOne.value);

     console.log(makeDeck.cards);
    //  console.log(cardsInPlay);
    //  console.log(pCardOne, pCardTwo, dCardOne, dCardTwo);

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
    var nextCardOne = makeDeck.cards[Math.floor(Math.random() * makeDeck.cards.length)];
    makeDeck.cards.splice(nextCardOne, 1);
    cardsInPlay.push(nextCardOne);
    $pCardThree.text(nextCardOne.face + nextCardOne.value);
    $playerTally.text('Current score: ' + (playerVals + nextCardOne.value));

  

  }

  // event listener for hit me button:
  $hitBtn.on('click', hitMe);


}); // end of window onload jquery functions
