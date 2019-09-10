import styled from 'styled-components';


//imporitng the bg image from src
import bgImage from '../../img/bg.png';

//Styling the component
export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${bgImage}) #000;
  background-size: cover;
  over-flow: hidden;
`

export const StyledTetris = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;

  aside{
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`