import React, { useState } from 'react'

import { createStage, checkCollision } from '../gameHelpers';

//styled components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris'

//Components 
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

//custom Hooks
import { useInterval} from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus} from '../hooks/useGameStatus';

const Tetris =() => {

  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  //const [stage, setStage] = useStage(player);
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel]= useGameStatus(rowsCleared);
  console.log('re-render');

  //Game related fucntions
  const movePlayer = dir => 
  {
    if(!checkCollision(player, stage, {x: dir, y: 0}))
    {
      updatePlayerPos({x: dir, y: 0});
    }
  }
  const startGame = ()=>
  {
    //Reset everything 
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);

  }
  const drop = ()=>
  {
    //Increase level when cleaning 10 rows
    if(rows > (level + 1)* 10)
    {
      setLevel(prev=> prev + 1)
      //Increase speed
      setDropTime(1000/ (level + 1) + 200);
    }
    
    if(!checkCollision(player, stage, {x: 0, y: 1}))
    {
      updatePlayerPos({x:0, y: 1, collided: false})
    } else{
      //Game Over
      if(player.pos.y < 1)
      {
        console.log("Game Over!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true});
    }
  }

  const keyUp= ({ keyCode }) =>
  {
    if(!gameOver)
    {
      if(keyCode === 40)
      {
        console.log("interval on")
        setDropTime(1000/ (level + 1) + 200);
      }
    }
  }
  
  const dropPlayer= ()=>
  {
    console.log("interval off")
    setDropTime(null);
    drop();
  }
  const move= ({ keyCode}) =>
  {
    if(!gameOver)
    {
      //keyboard keycodes
      if(keyCode === 37) //37 = left
      {
        //-1 moves to the left
        movePlayer(-1)
      }else if(keyCode === 39) //39 = right
      {
        movePlayer(1)
      }else if(keyCode === 40) // 40 = down
      {
        dropPlayer();
      }else if(keyCode === 38)// 38 = up
      {
        playerRotate(stage, 1);
      }
    }
  }

  //setting up the intervals
  useInterval(()=>
  {
    drop();
  },dropTime)

  return(
    //Got to set role to button otherwise it wont respond to keypress
    <StyledTetrisWrapper 
      role= "button" 
      tabIndex="0" 
      onKeyDown={e=>move(e)} 
      onKeyUp= {keyUp}
    >

      <StyledTetris>
        <Stage stage= {stage} />
        <aside>
          {gameOver ? 
            (
              <Display gameOver= {gameOver} text="Game Over" />
            ):
            (
              <div>
                <Display  text= {`Score: ${score}`} />
                <Display  text= {`Rows: ${rows}`} />
                <Display  text= {`Level: ${level}`} />
              </div>
            )
          }
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};


export default Tetris;
