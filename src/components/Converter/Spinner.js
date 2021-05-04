import React from 'react';
import styled, { keyframes } from 'styled-components/macro';

export default function Spinner() {
  return (
    <>
      <Paragraph>Converting your video...</Paragraph>
      <Wrapper>
        <Circle />
      </Wrapper>
    </>
  );
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Circle = styled.div`
  width: 50px;
  height: 50px;
  border: 8px solid whitesmoke;
  border-top: 8px solid dodgerblue;
  border-radius: 50%;
  -webkit-animation: ${spin} 2s linear infinite;
  animation: spin 2s linear infinite;
`;

const Paragraph = styled.p`
  font-size: 14px;
  color: #191919;
  font-weight: 400;
`;
