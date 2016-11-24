console.log('deck file');

$(function() {
  // grabbing buttons:
  var $hitBtn = $('#hit');
  var $stayBtn = $('#stay');
  var $clearBtn = $('#clear');
  var $resetBtn = $('#reset');

  // grabbing player & dealer containers:
  $pHandContainer = $('#player-hand-container');
  $dHandContainer = $('#dealer-hand-container');

  // grabbing player & dealer banks & dealer tally:
  var $dealerTally = $('#dealer-tally');
  var $playerBank = $('#player-bank');
  var $dealerBank = $('#d-bank');

  // grabbing player input & submit button:
  var $playerInput = $('#input');
  var $playerBet = $('#submit-bet');

// making starting bank values global:
  var pUpdatedBank = 100;
  var dUpdatedBank = 100;

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
        this.cards.push(new Card(this.faces[i], 11, this.ranksAces[k]));
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
    pHandVal = 0;
    var aces = 0;
    for (var i = 0; i < this.pHand.length; i++) {
      var value = this.pHand[i].value;
      if (value == 11) {
        aces = aces + 1;
      }
      pHandVal = pHandVal + value;
    }
    while (pHandVal > 21 && aces > 0) {
      pHandVal = pHandVal - 10;
      aces = aces - 1;
    }
    return pHandVal;
  },
  pBank: 100,
  pBetValue: function() {
    var storeBet = $playerInput.val();
    return storeBet;

  },
  pBet: function() {
    $playerBank.html('Current bet: $' + player.pBetValue() + '<br> You currently have: $' + pUpdatedBank);
    // $playerInput.val('');
    dealer.deal();
  },
  pHitMe: function() {
      var nextCard = makeDeck.cards.pop();
      player.pHand.push(nextCard);
      player.pHandValue();
      $pNextCard = $('<div>');
      $pNextCard.text(nextCard.face + nextCard.rank);
      $pNextCard.addClass('player-card');
      $pHandContainer.append($pNextCard);

      $playerText.text('Your score: ' + pHandVal);

      if (pHandVal > 21) {
        $playerText.html('Bust! Sorry, you lose. Bet again! Score: ' + pHandVal);
        pUpdatedBank = pUpdatedBank - player.pBetValue();
        console.log(pUpdatedBank);
        $playerBank.html('You now have: $' + pUpdatedBank);
        dUpdatedBank = parseFloat(dUpdatedBank) + parseFloat(player.pBetValue());
        $dealerBank.html('Bank: $' + dUpdatedBank);

        player.pHand = [];
        dealer.dHand = [];
        $hitBtn.hide();
        $stayBtn.hide();
        $resetBtn.hide();
        $playerBet.on('click', player.pBet);
      }

      if (pHandVal === 21) {
        $playerText.html('You win! Score: ' + pHandVal + '<br> Bet again!');
        pUpdatedBank = parseFloat(pUpdatedBank) + parseFloat(player.pBetValue());
        console.log(pUpdatedBank);
        $playerBank.html('High roller! You now have: $' + pUpdatedBank);

        $hitBtn.hide();
        $stayBtn.hide();
        $resetBtn.hide();
        $playerBet.on('click', player.pBet);

      }
    }


} // end of player object
/////////////////////////////////////////////////////////////////////////////
var dealer = {
  dHand: [],
  dBank: 100,
  dHandValue: function() {
    dHandVal = 0;
    var dAces = 0;
    for (var i = 0; i < this.dHand.length; i++) {
      var dValue = this.dHand[i].value;
      if (dValue == 11) {
        dAces = dAces + 1;
      }
      dHandVal = dHandVal + dValue;
    }
    while (dHandVal > 21 && dAces > 0) {
      dHandVal = dHandVal - 10;
      dAces = dAces - 1;
    }
    return dHandVal;
  },
  deal: function() {
  // Clear card containers on each deal:
  player.pHand = [];
  dealer.dHand = [];
  $dealerTally.empty();
  $pHandContainer.empty();
  $dHandContainer.empty();
  $playerBet.off();

  $dealerTally.text("Dealer score: I bet you're curious");

    if (makeDeck.cards.length <= 2) {
      makeDeck.makeIt();
    } else if (makeDeck.cards.length > 2) {
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

       // show the first dealer card in the dHand:
       $dCard = $('<div>');
       $dCard.text(dealer.dHand[0].face + dealer.dHand[0].rank);
       $dCard.addClass('dealer-card');
       $dHandContainer.append($dCard);

       player.pHandValue();
       $playerText.text('Your score: ' + pHandVal);

       $clearBtn.hide();
       $hitBtn.show();
       $stayBtn.show();
     } // end of new game button event handler


} //end of dealer object
///////////////////////////////////////////////////////////////////////////


/////************///// GAME BEGINS /////************/////

$playerBank.html('You have: ' + '$' +player.pBank);

$dealerBank.html("Bank: $" + dealer.dBank);

$dealerTally.text('Place your bet to begin');

$hitBtn.hide();
$stayBtn.hide();
$clearBtn.hide();
$resetBtn.hide();


$playerBet.on('click', player.pBet);



///////////////////////////////////////////////////////////////////////////
var playerStay = function(){
  dealer.dHandValue();

    while (dHandVal < 17) {
      var dNextCard = makeDeck.cards.pop();
      dealer.dHand.push(dNextCard);
      dealer.dHandValue();
      console.log(dHandVal);
    }

  for (var i = 1; i < dealer.dHand.length; i++) {
    var $dCards = $('<div>');
    $dCards.text(dealer.dHand[i].face + dealer.dHand[i].rank)
    $dCards.addClass('dealer-card');
    $dHandContainer.append($dCards);
  }

  /////// Winning conditions ///////

    if (dHandVal > 21 || pHandVal === 21) {
      $playerText.html('You win! Score: ' + pHandVal + '<br> Bet again!');
      pUpdatedBank = parseFloat(pUpdatedBank) + parseFloat(player.pBetValue());
      console.log(pUpdatedBank);
      $playerBank.html('High roller! You now have: $' + pUpdatedBank);

    } else if (pHandVal > dHandVal) {
      $playerText.html('You win! Score: ' + pHandVal + '<br> Bet again!');
      pUpdatedBank = parseFloat(pUpdatedBank) + parseFloat(player.pBetValue());
      console.log(pUpdatedBank);
      $playerBank.html('High roller! You now have: $' + pUpdatedBank);

  /////// Losing conditions ///////

    } else if (dHandVal > pHandVal) {
      $playerText.html('Sorry, you lose. Bet again! Score: ' + pHandVal);
      pUpdatedBank = pUpdatedBank - player.pBetValue();
      console.log(pUpdatedBank);
      $playerBank.html('You now have: $' + pUpdatedBank);
      dUpdatedBank = parseFloat(dUpdatedBank) + parseFloat(player.pBetValue());
      $dealerBank.html('Bank: $' + dUpdatedBank);

    } else if (dHandVal === 21 || pHandVal > 21) {
      $playerText.html('Sorry, you lose. Bet again! Score: ' + pHandVal);
      pUpdatedBank = pUpdatedBank - player.pBetValue();
      console.log(pUpdatedBank);
      $playerBank.html('You now have: $' + pUpdatedBank);
      dUpdatedBank = parseFloat(dUpdatedBank) + parseFloat(player.pBetValue());
      $dealerBank.html('Bank: $' + dUpdatedBank);

/////// Tie condition ///////

    } else if (dHandVal === pHandVal) {
      $playerText.html('You tied with the dealer. Score: ' + pHandVal + '<br> Bet again!');
    }

    $dealerTally.text('Your score: ' + dHandVal);
    $hitBtn.hide();
    $stayBtn.hide();
    $playerBet.on('click', player.pBet);
}

// event listener for hit me button:
$hitBtn.on('click', player.pHitMe);

// event handler for stay function:
$stayBtn.on('click', playerStay);

}); // end of window onload jquery functions
