var playerOne = {name: 'playerOne', armySize: 100, tiles: 0}
var playerTwo = {name: 'playerTwo', armySize: -100, tiles: 0}

var gridAmount = 28
var $container = $('.container')
var allTiles = []


// Tile constructor
function Tile() {
  $container.append($("<div></div>"))
  this.armySize = 0;
  this.fortification = null;
  this.obstacle = null;
  $('.container > div').addClass('neutral')
}

// Creates all the tiles
for (var i = 0; i < gridAmount; i++) {
  allTiles[i] = new Tile
}
