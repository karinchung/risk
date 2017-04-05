var players = {
  playerOne: {name: null, armySize: 100, tileAmt: 0, tiles: [], color: 'blue'},
  playerTwo: {name: null, armySize: 100, tileAmt: 0, tiles: [], color: 'red'}
};

var gridAmount = 35;
var board = [];
var $container = $('.container');
var $body = $('body');
var currentPlayer = players.playerOne;
var otherPlayer = players.playerTwo;
var $startButton = $('<button>Start Game</button>');
var clicks = 0;
var currentArmy = 0;
var lastCell = null;
var viableTiles = [];
var option1 = 0;
var option2 = 0;
var option3 = 0;
var option4 = 0;
var totalTurnsAmt = 0;

$body.append($container);
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
var $allTiles = $('.container > div') // if this is placed above it doesn't work because tiles haven't been created yet
// $allTiles.mouseenter(function() {($(this).css('border', '1.5px solid orange'))});
// $allTiles.mouseleave(function() {($(this).css('border', '1.5px solid black'))});
$allTiles.mouseenter(function() {($(this).animate({opacity: .7}, 100))});
$allTiles.mouseleave(function() {($(this).animate({opacity: 1}, 100))});

// start game button and make armies appear
function startGame() {
  board[0].owner = players.playerOne
  board[0].showNewClass()
  board[0].tileDiv.text(players.playerOne.armySize)

  board[gridAmount - 1].owner = players.playerTwo
  board[gridAmount - 1].showNewClass()
  board[gridAmount - 1].tileDiv.text(players.playerTwo.armySize)
  $startButton.off('click', startGame)
  addTileScore()
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
  addTileScore()
  turnCounter()
};

//division
function divide(armyToDivide) {
  return Math.round(Number(armyToDivide / 2))
};

// displays to the user possible moves allowed
function checksOptions() {
  if (Number(lastCell.id) - 1 >= 0 && Number(lastCell.id) % 7 != 0) {
    option1 = Number(lastCell.id) - 1
    viableTiles[0] = option1
    $allTiles.eq(option1).css('filter', 'brightness(3)')
  }
  if (Number(lastCell.id) - 7 >= 0) {
    option2 = Number(lastCell.id) - 7
    viableTiles[1] = option2
    $allTiles.eq(option2).css('filter', 'brightness(3)')
  }
  if (Number(lastCell.id) + 1 < gridAmount
  && ((Number(lastCell.id) + 1) % 7 != 0 || Number(lastCell.id) == 0)) { // put an or statement for the 0
    option3 = Number(lastCell.id) + 1
    viableTiles[2] = option3
    $allTiles.eq(option3).css('filter', 'brightness(3)')
  }
  if (Number(lastCell.id) + 7 < gridAmount) {
    option4 = Number(lastCell.id) + 7
    viableTiles[3] = option4
    $allTiles.eq(option4).css('filter', 'brightness(3)')
  }

};

// gets rid of the displayed options after the player has clicked
function resetOptionDisplay() {
  $allTiles.eq(option1).css('filter', 'brightness(1)')
  $allTiles.eq(option2).css('filter', 'brightness(1)')
  $allTiles.eq(option3).css('filter', 'brightness(1)')
  $allTiles.eq(option4).css('filter', 'brightness(1)')
}

// for to move
function moveArmy() {
  if(clicks == 0 && $(this).attr('class') == currentPlayer.color) {
    clicks++
    currentArmy = this.innerText
    lastCell = this
    checksOptions()

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
    if (divide(clickedFirst) - clickedSecond > 0) {
      console.log(divide(clickedFirst) - clickedSecond)
      lastCell.innerText = divide(clickedFirst)
      this.innerText = divide(clickedFirst) - clickedSecond
      $(this).removeClass(otherPlayer.color)
      $(this).addClass(currentPlayer.color)
      clicks = 0
      resetOptionDisplay()
      switchTurns()
    }
    else if (battleResult > 0) {
      lastCell.innerText = clickedFirst - clickedSecond
      this.innerText = ""
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

// for win condition scoring
function addTileScore() {
  var blueScore = 0
  var redScore = 0
  for (var i = 0; i < $('.container > div').length; i++) {
    var thisAttr = $allTiles.eq(i).attr('class')
    if (thisAttr != 'neutral') {
      if ($allTiles.eq(i).attr('class') == 'blue') {
        blueScore += 1
        players.playerOne.tileAmt = blueScore
      }
      else if ($allTiles.eq(i).attr('class') == 'red') {
        redScore += 1
        players.playerTwo.tileAmt = redScore
      }
    }
  }
  displayWinner()
};

function displayWinner() {
  if (players.playerOne.tileAmt == 0) {
    console.log('Player Two Wins!')
  }
  if (players.playerTwo.tileAmt == 0) {
    console.log('Player One Wins!')
  }
};

function turnCounter() {
  var temp = totalTurnsAmt
  temp += 1
  if (temp % 2 == 0) {
    totalTurnsAmt += (temp/2)
  }
  console.log(totalTurnsAmt)
};

//every turn you get +1 to your current army for each tile you occupy
function reinforcementsToArmy() {

};
