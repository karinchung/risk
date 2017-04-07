# ![](title.png)

// notes: math.abs for winner


## A game about splitting in half to take control of other cells


![](game.png)
![](overlay.png)

Take control of all the cells on the board by clicking an adjacent cell to send half of your army there. Some of the cells you'll encounter will help and add to your total body count and other will hurt and subtract.

When you encounter an enemy you two will battle it by subtracting the amount of cells sent over!

The game can be played [here](https://karinchung.github.io/risk/)

## Technologies
Divide and Conquer uses HTML, CSS, Javascript, and jQuery.

## User Stories
* I'd like to see who's turn it is so I don't have to remember
* Cool graphics so I'm not bored
* A legend so I know what I'm doing and why
* States for when I'm clicking or hovering so I can see what I'm doing

## MVP
* Clicking on a cell to move half it's value to another cell
* Battle function to win over other cells
* Win display

## Nice to Haves
* Reset button
* Splash page to host this game and another game that's points based
* Fix breakpoints for tablet and mobile
* Tie movement to keys

## Bugs being worked on
* If you have a cell with 1 in it, instead of going away, it divides into two cells with 1 in both of them

## Credit
Images from Jason Moran, 3D artist. His website can be found [here](http://jasonmoran3d.com/)


//sudocode

1. create divs for each tile on the map
	* each div has a height and width.
	* class neutral, blue, red each with their own image
	* all classes have an army size, 0 for neutral, 100, 100
	* all divs have a click event
		* First click (if class != neutral) then listen for another click (if div != same div) (if neutral) grab half of the first div's army and add them to the second div. (if same class) add armies together then (if enemy is there too ) battle (if different class) then battle.

		battle checks

		1. if 1-2 <= 0 or 2-1 < 0 then
		2.  if army 1 > army 2, army 2 - 1. remve class 2 and add class 1. if army
		3. There shouldn't be a case where both are on the board

		Must switch turns too

				Game starts with everyone as neutral. Start game toggles the first and last tile to red and then blue
				
This is just a subtraction game. must add points on the map where I can add 2 to my army. (mercernary spots)
Or if I don't want to attack I can fotify

Extra:

1. tile count for each player (score)
2. sound/animation of armies


Grid 

randomly pick ocean squares (obstacles)

player 1 is positive
player two is negative

0 is neutral.
if positive then player 1
if negative then player 2

fortification: null

if the div has a fortification then it's true
if true then army *1.1

randomly generate where the fortifications are and where the blockades are


Roadblocks:
1. click events wait for two



     }
     //event listener must be removeable so it neEDS A NAME
     // remove event for everything except the tiles n/e/s/wso you can't click twice or too far
     // then on the second click, half their amry will be dispenced to that tile.
     // reset clicks
     var halfThisArmy = divide(this.innerHTML)
     this.innerHTML = halfThisArmy // the other half goes to the new tile but only on second click
     // if they keep clicking it will keep halving, so remove event listener or only have it actionable on second click

     var currentArmy = this.innerHTML

     // turn off click listener for all other tiles other than n/s/e/w- how?? //stretch goals is to highlight available cells to move to
     // should I add an id that I can reference?
     // if second click hasclass neutral just toggle class and move half
     // if same team, add them
     // if different team subtract them
     // this info needs to get sent to the players info above? also how?
   }

 });

Popup modal from an MIT open source plugin found [here](http://dev.vast.com/jquery-popup-overlay/)
<<<<<<< HEAD
>>>>>>> master
=======

Background image found on [pintrest](https://www.pinterest.com/pin/492018328012414496/) 
>>>>>>> master
