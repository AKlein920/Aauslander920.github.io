// console.log('hi');

var suits = ['diamonds', 'hearts', 'spades', 'clubs'];
var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var faces = ['♦', '♥', '♠', '♣'];

var Card = function() {
  this.suit = suits[(Math.floor(Math.random()*suits.length))];
  this.value = values[(Math.floor(Math.random()*values.length))];
  this.face = null;
  // this.face = [(Math.floor(Math.random()*faces.length))];
}

console.log(new Card());

var deck = {};

for (var i = 0; i < 52; i++) {
  var createCard = 
}


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
