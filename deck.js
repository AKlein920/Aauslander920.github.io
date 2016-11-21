console.log('deck file');

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
   console.log(this.cards);
 }

}
makeDeck.makeNum();
makeDeck.makeFace();
makeDeck.assignChar();
