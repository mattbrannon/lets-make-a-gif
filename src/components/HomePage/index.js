import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components/macro';

export default function HomePage() {
  return (
    <Wrapper>
      <Paragraph>I want to...</Paragraph>
      <div className="choices">
        <Link to="video">
          <NavButton name="videoPage">Convert a video</NavButton>
        </Link>
        <Link to="image">
          <NavButton name="imagePage">Convert images</NavButton>
        </Link>
      </div>
    </Wrapper>
  );
}

const NavButton = ({ name, children }) => {
  return (
    <Choice className="choice" name={name}>
      {children}
    </Choice>
  );
};

const Wrapper = styled.div`
  height: 80vh;
  width: 100%;
  display: grid;
  place-content: center;
  place-items: center;
  /* display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; */
`;

const Choice = styled.button.attrs((props) => ({
  name: props.name,
}))`
  max-width: 200px;
  width: 200px;
  max-height: 100px;
  height: 100px;
  border-radius: 8px;
  outline: none;

  background: #0058ad;
  color: white;
  font-weight: 700;
  font-size: 1.4rem;
  text-shadow: -1px 1px 3px #333, -2px 1px 1px #111;
  margin: clamp(calc(2 * var(--unit)), 5vh, calc(5 * var(--unit)))
    clamp(calc(2 * var(--unit)), 3vw, calc(5 * var(--unit)));

  &:hover {
    background: hsl(210, 100%, 50%);
    transition: all 0.2s;
  }
`;

const Paragraph = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: black;
  /* text-shadow: -1px 0px 1px #404040; */
`;
