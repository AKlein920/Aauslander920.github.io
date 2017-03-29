////////////// window onload
$(function() {
  toggle = true;
  player1 = {
    divs: [],
    color: 'Aqua',
    score: 0
  };
  player2 = {
    divs: [],
    color: 'Orange',
    score: 0
  };
  createBoard();
}); ////////////// end window onload

////////////// create game board
var createBoard = function() {
  var $board = $('<div>').attr('id', 'board');
  $('.box').append($board);

  for (var i = 0; i < 42; i++) {
    $spot = $('<div>').addClass('circle').attr('id', i);
    $board.append($spot);
    // add hover and event listener IF spot is in bottom row
    if (i >= 35) {
      $spot.hover(function() {
        $(this).css('background-color', 'lightgray');
      }, function() {
        $(this).css('background-color', 'white');
      })
      $spot.on('click', firstRowPlacer)
    }
  }

  $('#player1score').text("Aqua's current score: " + player1.score);
  $('#player2score').text("Orange's current score: " + player2.score);

  $('#reset').on('click', resetBoard);
};

////////////// click event handler
var firstRowPlacer = function() {
  if (toggle) {
    $(this).css('background-color', 'aquamarine').addClass('clicked');;
    player1.divs.push(Number(this.id));

    if (checkWin(player1.divs)) {
      player1.score++;
      $('.notify').text(player1.color + ' wins!');
      $('#player1score').text("Aqua's current score: " + player1.score);
    } else {
      $('.notify').text(player2.color + "'s turn now");
    };

    var $sevenUp = $(this).siblings('#' + (this.id-7));
    $sevenUp.hover(function() {
      $(this).css('background-color', 'lightgray');
    }, function() {
      $(this).css('background-color', 'white');
    })
    $sevenUp.on('click', firstRowPlacer);
    toggle = false;

  } else {
    $(this).css('background-color', 'lightsalmon').addClass('clicked');
    player2.divs.push(Number(this.id));
    // console.log(player2);
    if (checkWin(player2.divs)) {
      player2.score++;
      $('.notify').text(player2.color + ' wins!');
      $('#player2score').text("Orange's current score: " + player2.score)
    } else {
      $('.notify').text(player1.color + "'s turn now");
    };

    var $sevenUp = $(this).siblings('#' + (this.id-7));
    $sevenUp.hover(function() {
      $(this).css('background-color', 'lightgray');
    }, function() {
      $(this).css('background-color', 'white');
    })
    $sevenUp.on('click', firstRowPlacer);
    toggle = true;
  }

  $('.clicked').off();
};

////////////// reset event handler
var resetBoard = function() {
  toggle = true;
  player1.divs = [];
  player2.divs = [];
  $('#board').remove();
  createBoard();
};

////////////// check for win state
var checkWin = function(player) {
  for (var i = 0; i < winConditions.length; i++) {
    // initialize matches variable inside the FIRST loop, BEFORE looping through inner arrays
    var matches = 0;

    for (var j = 0; j < winConditions[i].length; j++) {
      for (var k = 0; k < player.length; k++) {
        if (winConditions[i][j] == player[k]) {
          // console.log(winConditions[i][j] + ' matches ' + player[k]);
          matches++;
          // console.log(matches);
          }
        }
      }
      if (matches == 4) {
        console.log('win');
        $('.circle').off();
        return true;
    }
  }
  console.log('no winner yet');
  return false;
};


////////////// winning conditions array
var winConditions = [
  // horizontal:
  [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],

  [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13],

  [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19], [17, 18, 19, 20],

  [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],

  [28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34],

  [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],

  // vertical:
  [0, 7, 14, 21], [7, 14, 21, 28], [14, 21, 28, 35],

  [1, 8, 15, 22], [8, 15, 22, 29], [15, 22, 29, 36],

  [2, 9, 16, 23], [9, 16, 23, 30], [16, 23, 30, 37],

  [3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38],

  [4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39],

  [5, 12, 19, 26], [12, 19, 26, 33], [19, 26, 33, 40],

  [6, 13, 20, 27], [13, 20, 27, 34], [20, 27, 34, 41],

  // diagonal R to L
  [3, 9, 15, 21], [4, 10, 16, 22], [5, 11, 17, 23], [6, 12, 18, 24], [10, 16, 22, 28], [11, 17, 23, 29], [12, 18, 24, 30], [13, 19, 25, 31], [17, 23, 29, 35], [18, 24, 30, 36], [19, 25, 31, 37], [20, 26, 32, 38],

  // diagonal L to R
  [0, 8, 16, 24], [1, 9, 17, 25], [2, 10, 18, 26], [3, 11, 19, 27], [7, 15, 23, 31], [8, 16, 24, 32], [9, 17, 25, 33], [10, 18, 26, 34], [14, 22, 30, 38], [15, 23, 31, 39], [16, 24, 32, 40], [17, 25, 33, 41]
];
