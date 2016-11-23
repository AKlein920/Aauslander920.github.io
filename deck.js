console.log('deck file');

$(function() {
  // grabbing buttons:
  var $dealBtn = $('#deal');
  var $hitBtn = $('#hit');
  var $stayBtn = $('#stay');
  var $clearBtn = $('#clear');
  var $resetBtn = $('#reset');

  // grabbing player & dealer containers:
  $pHandContainer = $('#player-hand-container');
  $dHandContainer = $('#dealer-hand-container');

  // grabbing player & dealer tallies:
  var $dealerTally = $('#dealer-tally');
  var $playerTally = $('#player-tally');

  // grabbing player text box:
  var $playerText = $('#player-text');
//////////////////////////////////////////////////////////////////////////

  // object constructor to make each new card:
  var Card = function(face, value, rank) {
    // this.suit = suit;
    this.face = face;
    this.value = value;
    this.rank = rank;
  }

  //  object to make/contain the deck:
  var makeDeck = {
    // empty array to hold cards:
    cards: [],
    faces: ['♦', '♥', '♠', '♣'],
    ranksFaces: ['J', 'Q', 'K'],
    ranksNumbers: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    ranksAces: ['A'],

    // write a method to make the numbers:
    makeNum: function() {
      for (var i = 0; i < this.faces.length; i++) {
        for (var j = 0; j < this.ranksNumbers.length; j++) {
          var eachNum = new Card(this.faces[i], this.ranksNumbers[j], this.ranksNumbers[j]);
          this.cards.push(eachNum);
        }
      }
    },

    // write a method to make the face cards:
    makeFace: function() {
      for (var i = 0; i < this.faces.length; i++) {
        for (var k = 0; k < this.ranksFaces.length; k++) {
          this.cards.push(new Card(this.faces[i], 10, this.ranksFaces[k]));
        }
      }
    },

  // write a method to make the Aces with a value of 1:
  makeAce: function() {
    for (var i = 0; i < this.faces.length; i++) {
      for (var k = 0; k < this.ranksAces.length; k++) {
        this.cards.push(new Card(this.faces[i], 1, this.ranksAces[k]));
      }
    }
  },

// Shuffle function to make life easier: (Fisher-Yates shuffle)
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
   },

   makeIt: function() {
     makeDeck.makeNum();
     makeDeck.makeFace();
     makeDeck.makeAce();
     makeDeck.shuffle();
   }

 } //end of deck object
makeDeck.makeIt();
///////////////////////////////////////////////////////////////////////////
// player & dealer objects:
var player = {
  pHand: [],
  pHandValue: function() {
    var pHandVal = 0;
    for (var i = 0; i < this.pHand.length; i++) {
      pHandVal = pHandVal + this.pHand[i].value;
    }
    return pHandVal;
  },
  pBank: 100,
  pHitMe: function() {
      var nextCard = makeDeck.cards.pop();
      player.pHand.push(nextCard);
      $pNextCard = $('<div>');
      $pNextCard.text(nextCard.face + nextCard.rank);
      $pNextCard.addClass('player-card');
      $pHandContainer.append($pNextCard);

      $playerText.text('Current score: ' + player.pHandValue());

      if (player.pHandValue() > 21) {
        $playerText.text('Current score: ' + player.pHandValue() + ' Bust! Click Deal to play again');
        player.pHand = [];
        dealer.dHand = [];
      // empty the player & dealer containers here?
        $hitBtn.hide();
        $stayBtn.hide();
        $dealBtn.show();
        $resetBtn.hide();
      }

      if (player.pHandValue() === 21) {
        $playerText.text('You win! Play again!');

        $hitBtn.hide();
        $stayBtn.hide();
        $dealBtn.show();
        $resetBtn.hide();
      }
    }


} // end of player object
/////////////////////////////////////////////////////////////////////////////
var dealer = {
  dHand: [],
  dBank: 100,
  dHandValue: function() {
    var dHandVal = 0;
    for (var i = 0; i < this.dHand.length; i++) {
      dHandVal = dHandVal + this.dHand[i].value;
    }
    return dHandVal;
  },
  deal: function() {
  //////// MUST CLEAR DIVS ON EACH DEAL /////////
  player.pHand = [];
  dealer.dHand = [];
  $dealerTally.empty();
  $pHandContainer.empty();
  $dHandContainer.empty();

    if (makeDeck.cards.length == 2) {
      makeDeck.makeIt();
    } else if (makeDeck.cards.length > 0) {
      var pCardOne = makeDeck.cards.pop();
      var pCardTwo = makeDeck.cards.pop();
      var dCardOne = makeDeck.cards.pop();
      var dCardTwo = makeDeck.cards.pop();
      player.pHand.push(pCardOne, pCardTwo);
      dealer.dHand.push(dCardOne, dCardTwo);
    }
      // pick cards out of the deck to display:

       for (var i = 0; i < player.pHand.length; i++) {
         var $pCard = $('<div>');
         $pCard.text(player.pHand[i].face + player.pHand[i].rank);
         $pCard.addClass('player-card');
         $pHandContainer.append($pCard);
       }
       $playerText.text('Current score: ' + player.pHandValue());

       // show the first dealer card in the dHand:
       $dCard = $('<div>');
       $dCard.text(dealer.dHand[0].face + dealer.dHand[0].rank);
       $dCard.addClass('dealer-card');
       $dHandContainer.append($dCard);

      //  dealer.dHandValue();

       $dealBtn.hide();
       $clearBtn.hide();
       $hitBtn.show();
       $stayBtn.show();
     } // end of new game button event handler


} //end of dealer object
///////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////
var playerStay = function(){

    while (dealer.dHandValue() < 17) {
      var dNextCard = makeDeck.cards.pop();
      dealer.dHand.push(dNextCard);
      dealer.dHandValue();
      console.log(dealer.dHandValue());
    }


  for (var i = 1; i < dealer.dHand.length; i++) {
    var $dCards = $('<div>');
    $dCards.text(dealer.dHand[i].face + dealer.dHand[i].rank)
    $dCards.addClass('dealer-card');
    $dHandContainer.append($dCards);
  }

    if (dealer.dHandValue() > 21 || player.pHandValue() === 21) {
      $playerText.text('You win! Score: ' + player.pHandValue());
    } else if (dealer.dHandValue() === 21 || player.pHandValue() > 21) {
      $playerText.text('You lose. Score: ' + player.pHandValue());
    } else if (dealer.dHandValue() > player.pHandValue()) {
      $playerText.text('You lose. Score: ' + player.pHandValue());
    } else if (dealer.dHandValue() === player.pHandValue()) {
      $playerText.text('You tied with the dealer. Score: ' + player.pHandValue());
    } else if (player.pHandValue() > dealer.dHandValue()) {
      $playerText.text('You win! Score: ' + player.pHandValue());
    }
    $dealerTally.text('Current score: ' + dealer.dHandValue());
    $hitBtn.hide();
    $stayBtn.hide();
    $dealBtn.show();
console.log(dealer.dHand);
}

// event listener for new game button:
$dealBtn.on('click', dealer.deal);

// event listener for hit me button:
$hitBtn.on('click', player.pHitMe);

// event handler for stay function:
$stayBtn.on('click', playerStay);

}); // end of window onload jquery functions
