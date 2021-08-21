import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components/macro';

export default function HomePage() {
  return (
    <Wrapper>
      <Paragraph>I want to...</Paragraph>
      <Choices>
        <Link to="video">
          <Choice name="videoPage">Convert a video</Choice>
        </Link>
        <Link to="image">
          <Choice name="imagePage">Convert images</Choice>
        </Link>
      </Choices>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Choices = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 48px;
  max-width: 80ch;
  width: 100%;
  margin: 0 auto;
`;

const Choice = styled.button`
  background: dodgerblue;
  color: white;

  padding: 24px;
  font-size: 1.2rem;
  font-weight: 800;
  text-shadow: -1px 1px 3px #333, -2px 1px 1px #111;
  border-radius: 8px;
  background: #0058ad;
`;

const Paragraph = styled.p`
  font-size: 1.4rem;
  font-weight: 700;
  color: black;
  text-align: center;
  margin-top: -128px;
  margin-bottom: 64px;
`;
