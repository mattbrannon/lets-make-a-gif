import styled from 'styled-components/macro';

import React from 'react';

const Instructions = ({ instructions }) => {
  return (
    <Wrapper>
      <h3>Instructions:</h3>
      <ul>
        {instructions.map((instruction) => {
          return <li key={Math.random()}>{instruction}</li>;
        })}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: start;
  margin: clamp(calc(2 * var(--unit)), 5vh, calc(5 * var(--unit)))
    clamp(calc(2 * var(--unit)), 3vw, calc(5 * var(--unit)));
  color: #000;
`;

// const arr = [
//   `Choose a video file on your computer that you'd like to convert to a gif`,
//   `Length of video must be less than 1 minute long`,
//   `Size of video must be less than 50mb`,
// ];

export default Instructions;
