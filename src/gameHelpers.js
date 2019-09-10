//This is responsable for setting up the stage
//for the game to run in the foreground

export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage =()=>
  //this is the grid created from the consts 
  Array.from(Array(STAGE_HEIGHT),()=>
    new Array(STAGE_WIDTH).fill([0, 'clear'])
  )

export const checkCollision=(player, stage, {x: moveX, y:moveY})=>
{
  for(let y= 0; y < player.tetromino.length; y+=1)
  {
    for(let x= 0; x < player.tetromino[y].length; x+=1)
    {
      //1. check that we are on a tetromino
      if(player.tetromino[y][x] !==0)
      {
        if(
          //2. checking if the movements are within the game's box (y)
          //restrain bottom
          !stage[y+player.pos.y + moveY] || 
          //3. Check movements to the sides (x)
          !stage[y+player.pos.y + moveY][x + player.pos.x+ moveX] ||
          //4. Check if the cell is set to clear
          stage[y+player.pos.y + moveY][x + player.pos.x + moveX][1]!==
          'clear'
        ) {return true;}
      }
    }
  }
}