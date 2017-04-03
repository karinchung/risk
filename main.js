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
  return (armyToDivide / 2)
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
}

function moveArmy() {
  var currentArmy
  if(clicks == 0 && $(this).attr('class') == currentPlayer.color) {
    console.log($(this).attr('class'))
    clicks++
    currentArmy = this.innerText
    return currentArmy
  }
  else if (clicks == 1 && $(this).attr('class') == 'neutral') {
    console.log('second click yooooo')
    var halfThisArmy = divide(currentArmy)
    console.log(currentArmy)
    console.log(halfThisArmy)
    // var halfThisArmy = divide(this.innerText)
    // console.log(this.innerText)
    // console.log(halfThisArmy)
  }
  else {
    console.log("Not a valid move")
  }
  //clear the clicks

}
