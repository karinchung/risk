var players = {
  playerOne: {name: null, armySize: 100, tiles: [], color: 'blue'},
  playerTwo: {name: null, armySize: 100, tiles: [], color: 'red'}
}

//armySize is really just starting army size unless it's zero in which case you dead
// count tiles for win condition

var gridAmount = 35
var $container = $('.container')
var $body = $('body')
var board = []
var currentPlayer = players.playerOne;
var $startButton = $('<button>Start Game</button>')
var clicks = 0
var currentArmy = 0
var lastCell = null;

$body.append($startButton)
$startButton.on('click', startGame)



// tile creation constructor
function Tile() {
  this.tileDiv = ($('<div></div>', {'class': 'neutral'}));
  this.owner = null;
  this.armySize = 0;
  this.fortification = null;
  this.obstacle = null;
  this.showNewClass = function() {
    if (this.owner == players.playerOne) {
      if (this.tileDiv.hasClass('neutral')) {
        this.tileDiv.removeClass('neutral')
        this.tileDiv.toggleClass('blue')
      }
    }
    else if (this.owner == players.playerTwo) {
      if (this.tileDiv.hasClass('neutral')) {
        this.tileDiv.removeClass('neutral')
        this.tileDiv.toggleClass('red')
        }
      }
    };
    this.tileDiv.on('click', moveArmy);

}

function divide(armyToDivide) {
  return Number(armyToDivide / 2)
}

// Creates all the tiles
for (var i = 0; i < gridAmount; i++) {
  board[i] = new Tile()
  //board[i].tileDiv.text(i) //take this out, this for logic later
  $container.append(board[i].tileDiv)
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
  board[0].owner = players.playerOne
  board[0].showNewClass()
  board[0].tileDiv.text(players.playerOne.armySize)

  board[gridAmount - 1].owner = players.playerTwo
  board[gridAmount - 1].showNewClass()
  board[gridAmount - 1].tileDiv.text(players.playerTwo.armySize)
  $startButton.off('click', startGame)
}

function moveArmy() {
  // first click must be a tile color of the current player
  if(clicks == 0 && $(this).attr('class') == currentPlayer.color) {
    clicks++
    currentArmy = this.innerText
    lastCell = this
  }
  // second click: if a neutral tile is clicked
  else if (clicks == 1 && $(this).attr('class') == 'neutral') {
    var halfThisArmy = divide(currentArmy)
    $(this).removeClass('neutral')
    $(this).toggleClass(currentPlayer.color)
    this.innerText += halfThisArmy
    lastCell.innerText = halfThisArmy
    // console.log(this.innerText)
    clicks = 0
    switchTurns()
  }
  // second click: if the same color tile is clicked
  else if (clicks == 1 && $(this).attr('class') == currentPlayer.color) {
    var halfThisArmy = divide(currentArmy)
    console.log(parseInt(this.innerText))
    this.innerText = parseInt(this.innerText) + halfThisArmy // number() didn't work
    lastCell.innerText = halfThisArmy
  }
  else {
    console.log("Not a valid move")
  }
}
