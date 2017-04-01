var risk = {
  playerOne: {name: 'playerOne', armySize: 100, tiles: 0},
  playerTwo: {name: 'playerTwo', armySize: -100, tiles: 0}
}

var gridAmount = 28
var $container = $('.container')
var $body = $('body')
var allTiles = []
var currentPlayer = risk.playerOne;
var $startButton = $('<button>Start Game</button>')

$body.append($startButton)
$startButton.on('click', startGame)


// Tile constructor
function Tile() {
  $container.append($('<div></div>'))
  this.armySize = 0;
  this.fortification = null;
  this.obstacle = null;
  $('.container > div').addClass('neutral')
}

// Creates all the tiles
for (var i = 0; i < gridAmount; i++) {
  allTiles[i] = new Tile
}

// switch turns
function switchTurns() {
  if(currentPlayer == risk.playerOne) {
    currentPlayer = risk.playerTwo
  } else {
    currentPlayer = risk.playerOne
  }
}

// start game button and make armies appear
function startGame() {
  allTiles[0].armySize += risk.playerOne.armySize
  allTiles[gridAmount - 1].armySize += risk.playerTwo.armySize
}

// toggles class based on armySize being + or - 0dffrfd
