import styled from 'styled-components/macro';
import { keyframes } from 'styled-components';

export default function LoadingSpinner({ percentComplete }) {
  return (
    <Wrapper>
      {percentComplete < 100 ? (
        <progress max={100} value={percentComplete}></progress>
      ) : (
        <>
          <Spinner />
          <Message>Converting to gif...</Message>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  place-content: center;
`;

const Message = styled.code`
  margin: 16px auto;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg)
  }
`;

const Spinner = styled.div`
  height: 50px;
  width: 50px;
  background: transparent;
  border: 8px solid #ebebeb;
  border-radius: 50%;
  border-top: 8px solid blue;
  animation: ${spin} 2s infinite linear forwards;
  margin: auto;
`;
