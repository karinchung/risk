### Risk

// notes: math.abs for winner



**Risk**
	* You click on tiles to move army men to them from a starting pool. Start with 100 when you click on the starting pool and then somewhere else it takes half away from your army and places them there. If there is already something there it adds them. If they're from an enemy team, it subtracts. Tiles change color based on who has an army there.

Grid/Map of tiles that start out as neutral.

Player 1 and player 2 start on opposite ends of the map with their tiles toggled to their player color.

Player 1 clicks on their starting tile which has an army size of 100.

They then click on an adjascent tile. They can't click on the same tile.

Half of their army (rounded down) is sent to that tile.

If they have an in that tile, it adds them.

If there is an enemy in that tile, it subtracts them and displays the one with more. (case where two players are on the same tile, you add more to your army. It had to add your army first, then execute the battle function.

Game ends when a player has defeated the other player's army. If player 2 has 0 army, they lose.

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