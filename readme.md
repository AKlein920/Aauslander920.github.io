Technologies used:

- HTML
- CSS
- javascript
- jquery

Approach taken:

I tried to use an object-oriented approach. I created a deck object, dealer object, and player object. Within my deck object, I use a constructor function to build each card within the deck. I use functions to build each number card first, then each face card, then each ace. Each card is pushed into an empty array to hold the deck as it's played. The deck is shuffled using the Fisher-Yates shuffle function.

As the game begins, the player is prompted to place a bet. Once the bet is placed, the player clicks the 'Submit bet & deal' button; on click, the deal function (within the dealer object), bet function, and hand value function (both within the player object) are run. The deal function deals 2 cards face-up to the player, and 1 card face-up to the dealer. Another card is dealt face-down to the dealer. The bet function places the value of the input box into the player's text area below his cards and updates the player's bankroll. The hand value function calculates the value of the player's hand, using ace logic if an ace is dealt.

Hit and Stay buttons appear; the player can choose to hit; on click, the hit me function (within the player object) is run, and another card is removed from the deck and appended to the player's hand. The hand's value is recalculated. If the hand's value goes over 21, the player busts and loses his bet money. He is also prompted to bet again. If the player's hand reaches 21 exactly, he automatically wins and wins his bet money back. The player can choose to stay; on click, the stay function (not located within an object) is run. This function removes the face-down card from the dealer, prompts the dealer to hit until his hand reaches at least 17, appends the new cards to the dealer's hand, and calculates the winner based on the winning/losing conditions. If the player loses, his bet money is added to the dealer's bankroll. If the player wins, he wins back his bet money.

The winning and losing conditions account for:
- player bust (within hit me function)
- player hand = 21 (within hit me & stay functions)
- player hand > dealer hand (within stay function)
- dealer bust (within stay function)
- player hand < dealer hand (within stay function)
- dealer hand = 21 & player hand < 21 (within stay function)

If player hand = dealer hand, no money is lost and the player is prompted to bet again.

Within every condition, the player is prompted to bet again as long as he has money in his bankroll.

If the number of cards within the deck becomes too low to continue the game (i.e. if there are only 2 cards left; at least 3 cards are required to deal a new hand), a new deck is created and shuffled. This allows for unlimited hands; the player does not have to refresh the browser.

Link to live site: https://aauslander920.github.io/

Things I'm proud of:
- Creating a new shuffled deck every time the deck runs low
- responsive design based on browser window size (though not necessarily mobile-ready)
- a somewhat organized object-oriented Approach

Things that still need work/could use tweaking:
- Once the player's bankroll reaches 0, the player is prompted to reset the game with a reset button. As of now, the reset button is still not replenishing the bankroll to 100.
- My code is only somewhat organized; I don't feel that it's as DRY as it should be. I would have liked to create different JS files that interact with one another, but I'm not yet sure how to do that. I would like more practice with the OOP approach.
- In the future, I would like to have the player win automatically if his hand contains blackjack (and ace and a face card), and add a split & double down function.
