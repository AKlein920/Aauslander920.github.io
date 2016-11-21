// console.log('hi');

// declare variables for cards
var suits = ['diamonds', 'hearts', 'spades', 'clubs'];
var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var faces = ['♦', '♥', '♠', '♣'];


// object constructor to make each new card
var Card = function(suit) {
  this.suit = suit;
  this.value = null;
}

var makeDiamondNumbers = function() {
  for (var i = 0; i < 10; i++) {
    var eachDiamondNumber = new Card(suits[0]);


    for (var j = 0; j < values.length; j++) {
      var eachDiamondValue = values[i];
      this.value = eachDiamondValue;
      console.log(eachDiamondNumber);
      }
  }
}
makeDiamondNumbers();

//   }
//   for (var j = 0; j < values.length; j++) {
//     this.value = values[i];
//   }
//   if (this.suit == 'diamonds') {
//       this.face == '♦';
//   } else if (this.suit == 'hearts') {
//     this.face == '♥';
//   } else if (this.suit == 'spades') {
//     this.face == '♠';
//   } else if (this.suit == 'clubs') {
//     this.face == '♣'
//   }
//


// var card1 = new Card(suits[0], values[0]);
// var card2 = new Card(suits[1], values[1]);


// function to loop through suits
// var suitsFunc = function() {
//   for (var i = 0; i < suits.length; i++) {
//     var allSuits = suits[i];
//     //this gives all suits values!!!
//     // console.log(allSuits);
//   }
// }
// suitsFunc();
//
// // function to loop through values
// var valuesFunc = function() {
//   for (var i = 0; i < values.length; i++) {
//     var allValues = values[i];
//     //this gives all values values!!!
//     // console.log(allValues);
//   }
// }
// valuesFunc();


// function to make the deck

// var cardValues = function(suitsFunc) {
//   for (var i = 0; i < 52; i++) {
//     var Suit = suitsFunc();
//   }
//   console.log();
// }
// console.log(cardValues());
//
// var makeDeck = function(suitsFunc, valuesFunc) {
//   var deck = [];
//   for (var i = 0; i < 52; i++) {
//     var eachCard = new Card(suitsFunc, valuesFunc);

//     deck.push(eachCard);
//   }
//   return deck;
// }
//
// console.log(makeDeck());

// making an empty object for the deck
// var deck = [];
//
// // function to fill the deck with number cards:
// var fillDeckArray = function() {
//   for (var i = 0; i < values.length; i++) {
//     values[i]
//   }
// }


//   cardsInPlay: [],
//   createCard: new Card()
//   checkCardDetails: function() {
//     if (createCard.suit == 'diamonds') {
//       createCard.face == faces[0];
//     } else if (createCard.suit == 'hearts') {
//       createCard.face == faces[1];
//     } else if (createCard.suit == 'spades') {
//       createCard.suit == faces[2];
//     } else if (createCard.suit == 'clubs') {
//       createCard.suit == faces[3];
//     }
//   }
//

// console.log(deck.createCard());
