var players = {
  playerOne: {name: null, armySize: 100, tiles: [], color: 'blue'},
  playerTwo: {name: null, armySize: 100, tiles: [], color: 'red'}
};

var gridAmount = 35;
var $container = $('.container');
var $body = $('body');
var board = [];
var currentPlayer = players.playerOne;
var otherPlayer = players.playerTwo;
var $startButton = $('<button>Start Game</button>');
var clicks = 0;
var currentArmy = 0;
var lastCell = null;
var viableTiles = [];

$body.append($startButton);
$startButton.on('click', startGame);

// tile creation constructor
function Tile() {
  this.tileDiv = ($('<div></div>', {'class': 'neutral', 'id': i}));
  this.owner = null;
  this.armySize = 0;
  this.fortification = null;
  this.obstacle = null;
  this.showNewClass = function() { // refactor later and take out
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
};

// Creates all the tiles
for (var i = 0; i < gridAmount; i++) {
  board[i] = new Tile()
  $container.append(board[i].tileDiv)
};
var $allTiles = $('.container > div') // if this is put up above the code it doesn't work because tiles haven't been created yet?
$allTiles.mouseenter(function() {($(this).css('border', '1px solid orange'))});
$allTiles.mouseleave(function() {($(this).css('border', '1px solid black'))});

// start game button and make armies appear
function startGame() {
  board[0].owner = players.playerOne
  board[0].showNewClass()
  board[0].tileDiv.text(players.playerOne.armySize)

  board[gridAmount - 1].owner = players.playerTwo
  board[gridAmount - 1].showNewClass()
  board[gridAmount - 1].tileDiv.text(players.playerTwo.armySize)
  $startButton.off('click', startGame)
};

// switch turns
function switchTurns() {
  if(currentPlayer == players.playerOne) {
    currentPlayer = players.playerTwo
    otherPlayer = players.playerOne

  } else {
    currentPlayer = players.playerOne
    otherPlayer = players.playerTwo
  }
};

function divide(armyToDivide) {
  return Number(armyToDivide / 2)
};

function moveArmy() {
  // first click must be a tile color of the current player
  if(clicks == 0 && $(this).attr('class') == currentPlayer.color) {
    clicks++
    currentArmy = this.innerText
    lastCell = this
    if (lastCell.id -1 > 0) { // can this be put into a separate function?
      viableTiles[0] = Number(lastCell.id - 1)
    }
    if (lastCell.id - 7 > 0) {
      viableTiles[1] = Number(lastCell.id - 7)
    }
    if (lastCell.id + 1 < gridAmount - 1) {
      viableTiles[2] = Number(lastCell.id + 1)
    }
    if (lastCell.id + 7 < gridAmount - 1) {
      viableTiles[3] = Number(lastCell.id + 7)
    }
    // add a function here that toggles the viableTiles css to orange

  }
  // second click: if a neutral tile is clicked
  else if ((clicks == 1 && $(this).attr('class') == 'neutral') &&
  (this.id == viableTiles[0] || this.id == viableTiles[1] || this.id == viableTiles[2] || this.id == viableTiles[3]) ) {
    // bug: you can click on yourself and delete yourself so that's great
    console.log(this.id)
    var halfThisArmy = divide(currentArmy)
    $(this).removeClass('neutral')
    $(this).toggleClass(currentPlayer.color)
    this.innerText += halfThisArmy
    lastCell.innerText = halfThisArmy
    clicks = 0
    switchTurns()
  }
  // second click: if the same color tile is clicked
  else if (clicks == 1 && $(this).attr('class') == currentPlayer.color) {
    var halfThisArmy = divide(currentArmy)
    this.innerText = parseInt(this.innerText) + halfThisArmy // number() didn't work
    lastCell.innerText = halfThisArmy
    clicks = 0
    switchTurns()
  }
  // second click: if an enemy tile is clicked
  else if (clicks == 1 && $(this).attr('class') != 'neutral' && ($(this).attr('class') != currentPlayer.color)) {
    var clickedFirst = parseInt(lastCell.innerText)
    var clickedSecond = parseInt(this.innerText)
    var battleResult = clickedFirst - clickedSecond
    if (battleResult > 0) {
      lastCell.innerText = clickedFirst - clickedSecond
      this.innerText = ""
      $(this).removeClass(otherPlayer.color)
      $(this).addClass('neutral')
      clicks = 0
      switchTurns()
    }
    else if (battleResult < 0) {
      lastCell.innerText = ""
      this.innerText = clickedSecond - clickedFirst
      $(lastCell).removeClass(currentPlayer.color)
      $(lastCell).addClass('neutral')
      clicks = 0
      switchTurns()
    }
    else if (battleResult == 0) {
      lastCell.innerText = ""
      this.innerText = ""
      $(lastCell).removeClass(currentPlayer.color)
      $(lastCell).addClass('neutral')
      $(this).removeClass(otherPlayer.color)
      $(this).addClass('neutral')
      clicks = 0
      switchTurns()
    }
  }
  else {
    console.log("Not a valid move")
  }
};
