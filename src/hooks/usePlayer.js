import { useState, useCallback } from 'react';
import { TETROMINOS, randomTetromino } from '../tetrominos';
import {STAGE_WIDTH} from '../gameHelpers';
//use :"use" otherwise react wont know that it is a custom hook

export const usePlayer =() => {
  const [player, setPlayer] = useState({
    pos: {x:0, y:0},
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const rotate = (matrix, dir)=>
  {
    //make the rows into columns(transpose)
    const rotatedTetro= matrix.map((_,index)=>
    matrix.map(col => col[index]))

    //Reverse each row to get a rotated matrix
    
    if( dir > 0 ) return rotatedTetro.map(row=> row.reverse());
    return rotatedTetro.reverse();
  }

  const playerRotate = (stage, dir)=>
  {
    //in order not to mutate the state...
    //deep copy
    const clonedPlayer= JSON.parse(JSON.stringify(player));

    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    setPlayer(clonedPlayer);
  }
  const updatePlayerPos =({x,y, collided}) =>
  {
    setPlayer(prev=>({
      ...prev,
      pos:{x: (prev.pos.x+=x), y:(prev.pos.y+=y)},
      collided,
    }))
  }

  //using callback not to have an infinite loop
  const resetPlayer= useCallback(()=>
  {
    setPlayer({
      pos:{x: STAGE_WIDTH/2 - 2, y: 0},
      tetromino: randomTetromino().shape,
      collided: false
    })
  },[]) 
  return [player, updatePlayerPos, resetPlayer, playerRotate];
}