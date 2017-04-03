var players = {
  playerOne: {name: null, armySize: 100, tiles: [], color: 'blue'},
  playerTwo: {name: null, armySize: 100, tiles: [], color: 'red'}
}

var gridAmount = 28
var $container = $('.container')
var $body = $('body')
var $board = []
var currentPlayer = players.playerOne;
var $startButton = $('<button>Start Game</button>')

$body.append($startButton)
$startButton.on('click', startGame)


// tile creation constructor
function Tile() {
  this.tileDiv = ($('<div></div>', {'class': 'neutral'}));
  // this is making the $container class change to neutral? WHY?
  // how to add class in a different line?
  // append to container in a different line?
  this.tileDiv.owner = null;
  this.armySize = 0;
  this.fortification = null;
  this.obstacle = null;
  this.showNewClass = function() {
    if (this.owner == players.playerOne) {
      if (this.tileDiv.hasClass('neutral')) {
        this.tileDiv.removeClass('neutral')
        this.tileDiv.toggleClass('blueTeam')
      }
    }
    else if (this.owner == players.playerTwo) {
      if (this.tileDiv.hasClass('neutral')) {
        this.tileDiv.removeClass('neutral')
        this.tileDiv.toggleClass('redTeam')
      }
    }
  };
 // click event only for the tiles that have teams on them
  this.tileDiv.on('click', function() { // grabbing the div not the tile
    if ((currentPlayer == players.playerOne) && this.className == 'blueTeam') {
      var currentArmy = this.innerHTML

      // turn off click listener for all other tiles other than n/s/e/w- how??
      // if second click hasclass neutral just toggle class and move half
      // if same team, add them
      // if different team subtract them
      // this info needs to get sent to the players info above? also how?
    }

  });
}

function divide(armyToDivide) {
  return armyToDivide / 2
}

// Creates all the tiles
for (var i = 0; i < gridAmount; i++) {
  $board[i] = new Tile
  $board[i].tileDiv.text(i) //take this out, this for logic later
  $container.append($board[i].tileDiv)
}

// switch turns
function switchTurns() {
  if(currentPlayer == players.playerOne) {
    currentPlayer = players.playerTwo

  } else {
    currentPlayer = players.playerOne
  }
}

// start game button and make armies appear
var $allTiles = $('.container > div') // if this is put up above the code it doesn't work because tiles haven't been created yet?
function startGame() {
  $board[0].owner = players.playerOne
  $board[0].showNewClass()
  $board[0].tileDiv.text(players.playerOne.armySize)

  $board[gridAmount - 1].owner = players.playerTwo
  $board[gridAmount - 1].showNewClass()
  $board[gridAmount - 1].tileDiv.text(players.playerTwo.armySize)

}
