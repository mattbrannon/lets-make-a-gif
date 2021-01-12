import React from 'react';
import s from './styles/style.module.css';
const Instructions = ({ instructions }) => {
  return (
    <div className={s.instructions}>
      <h3>Instructions:</h3>
      <ul>
        {instructions.map(instruction => {
          return <li key={Math.random()}>{instruction}</li>;
        })}
      </ul>
    </div>
  );
};

// const arr = [
//   `Choose a video file on your computer that you'd like to convert to a gif`,
//   `Length of video must be less than 1 minute long`,
//   `Size of video must be less than 50mb`,
// ];

export default Instructions;
