import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from '../tetrominos';

const Cell = ({type}) => (
  <StyledCell type={type} color= {TETROMINOS[type].color}/>
)

//optimization to rerender only cells that are changing
export default React.memo(Cell);