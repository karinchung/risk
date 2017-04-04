var players = {
  playerOne: {name: null, armySize: 100, tiles: [], color: 'blue'},
  playerTwo: {name: null, armySize: 100, tiles: [], color: 'red'}
};

//armySize is really just starting army size unless it's zero in which case you dead
// count tiles for win condition


var gridAmount = 35;
var $container = $('.container');
var $body = $('body');
var board = [];
var currentPlayer = players.playerOne;
var otherPlayer = players.playerTwo;
var $startButton = $('<button>Start Game</button>')
var clicks = 0
var currentArmy = 0
var lastCell = null;
var $startButton = $('<button>Start Game</button>');
var clicks = 0;
var currentArmy = 0;
var lastCell = null;
var viableTiles = [];
var option1 = 0;
var option2 = 0;
var option3 = 0;
var option4 = 0;


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

function divide(armyToDivide) {
  return Number(armyToDivide / 2)
};

// Creates all the tiles
for (var i = 0; i < gridAmount; i++) {
  board[i] = new Tile()
  $container.append(board[i].tileDiv)
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

var $allTiles = $('.container > div') // if this is put up above the code it doesn't work because tiles haven't been created yet?
$allTiles.mouseenter(function() {($(this).css('border', '1px solid orange'))});
$allTiles.mouseleave(function() {($(this).css('border', '1px solid black'))});
var $allTiles = $('.container > div') // if this is placed above it doesn't work because tiles haven't been created yet
$allTiles.mouseenter(function() {($(this).css('border', '1.5px solid orange'))});
$allTiles.mouseleave(function() {($(this).css('border', '1.5px solid black'))});

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

function checksOptions() {
  if (Number(lastCell.id) - 1 >= 0 && Number(lastCell.id) % 7 != 0) {
    option1 = Number(lastCell.id) - 1
    viableTiles[0] = option1
    console.log('original cell was ' + lastCell.id)
    console.log('option1 is ' + option1)
    $allTiles.eq(option1).css('border', '1.5px solid orange')
  }
  if (Number(lastCell.id) - 7 >= 0) {
    option2 = Number(lastCell.id) - 7
    viableTiles[1] = option2
    console.log('original cell was ' + lastCell.id)
    console.log('option2 is ' + option2)
    $allTiles.eq(option2).css('border', '1.5px solid orange')
  }
  if (Number(lastCell.id) + 1 < gridAmount
  && ((Number(lastCell.id) + 1) % 7 != 0 || Number(lastCell.id) == 0)) { // put an or statement for the 0
    option3 = Number(lastCell.id) + 1
    viableTiles[2] = option3
    console.log(option3)
    console.log('original cell was ' + lastCell.id)
    console.log('option3 is ' + option3)
    $allTiles.eq(option3).css('border', '1.5px solid orange')
  }
  if (Number(lastCell.id) + 7 < gridAmount) {
    option4 = Number(lastCell.id) + 7
    viableTiles[3] = option4
    console.log(option4)
    console.log('original cell was ' + lastCell.id)
    console.log('option4 is ' + option4)
    $allTiles.eq(option4).css('border', '1.5px solid orange')
  }

};

function resetOptionDisplay() {
  $allTiles.eq(option1).css('border', '1px solid black')
  $allTiles.eq(option2).css('border', '1px solid black')
  $allTiles.eq(option3).css('border', '1px solid black')
  $allTiles.eq(option4).css('border', '1px solid black')
}

function moveArmy() {
  // first click must be a tile color of the current player
  if(clicks == 0 && $(this).attr('class') == currentPlayer.color) {
    // make the cell look clicked. Then have it go away
    clicks++
    currentArmy = this.innerText
    lastCell = this
    checksOptions()
    // add a function here that toggles the viableTiles css to orange

  }
  // second click: if a neutral tile is clicked
  else if ((clicks == 1 && $(this).attr('class') == 'neutral') &&
  (this.id == viableTiles[0] || this.id == viableTiles[1] || this.id == viableTiles[2] || this.id == viableTiles[3]) ) {
    // bug: you can click on yourself and delete yourself so that's great
    var halfThisArmy = divide(currentArmy)
    $(this).removeClass('neutral')
    $(this).toggleClass(currentPlayer.color)
    this.innerText += halfThisArmy
    lastCell.innerText = halfThisArmy
    clicks = 0
    resetOptionDisplay()
    switchTurns()
  }
  // second click: if the same color tile is clicked
  else if (clicks == 1 && $(this).attr('class') == currentPlayer.color) {
    var halfThisArmy = divide(currentArmy)
    this.innerText = parseInt(this.innerText) + halfThisArmy // number() didn't work
    lastCell.innerText = halfThisArmy
    clicks = 0
    resetOptionDisplay()
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
      $(this).removeClass(otherPlayer.color)//this.removeClass(OtherPlayer) //make this a thing if current player is x...
      $(this).addClass('neutral') //remove the other class?
      clicks = 0
      $(this).removeClass(otherPlayer.color)
      $(this).addClass('neutral')
      clicks = 0
      resetOptionDisplay()
      switchTurns()
    }
    else if (battleResult < 0) {
      lastCell.innerText = ""
      this.innerText = clickedSecond - clickedFirst
      $(lastCell).removeClass(currentPlayer.color)
      $(lastCell).addClass('neutral')
      clicks = 0
      resetOptionDisplay()
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
      resetOptionDisplay()
      switchTurns()
    }
  }
  else {
    console.log("Not a valid move")
  }
};

//highlight cell when clicked on
// highlight possible cells to go to
