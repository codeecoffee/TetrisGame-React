import {useState, useEffect} from 'react';
import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => 
{
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);
  useEffect(()=>
  {
    setRowsCleared(0);
    const sweepRows = newStage =>
      newStage.reduce((ack, row )=>
      {
        //find Index returns -1 if it doesnt find a 0
        if(row.findIndex(cell=> cell[0] === 0) === -1)
        {
          setRowsCleared(prev=> prev +1 );
          ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
          return ack;
        }
        ack.push(row);
        return ack;

      },[])
    const updateStage = prevStage => 
    {
      //first step: flush the stage
      const newStage = prevStage.map(row=>
        row.map(cell=> 
        (cell[1] === 'clear'? 
          [0,'clear']: cell)
        ),
      );
      //then draw the tetromino
      player.tetromino.forEach((row, y) => {
        //checking what cells are occupied
        row.forEach((value, x)=>{
          if(value!==0)
          {
            newStage[y+ player.pos.y][x+player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });
      //Check if collided 
      if(player.collided)
        resetPlayer();
      return newStage;
    };
    setStage(prev=> updateStage(prev));
  },[player, resetPlayer]);

  return [stage, setStage, rowsCleared];
} 

