import styled from 'styled-components/macro';
import { Link } from '@reach/router';
import mp4 from './wrongway.mp4';
import webm from './wrongway.webm';

export default function NotFoundPage() {
  return (
    <Wrapper>
      <Message>Looks like we made a wrong turn</Message>
      <VideoPlayer />
      <Link to="/">
        <Button>Back to safety</Button>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 80ch;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Message = styled.p`
  font-weight: 700;
  font-size: 1rem;
  color: #222;
  text-align: center;
  margin: 16px 0;
  line-height: 1.5;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const VideoPlayer = () => {
  return (
    <div>
      <video autoPlay muted loop>
        <source type="video/mp4" src={mp4} />
        <source type="video/webm" src={webm} />
      </video>
    </div>
  );
};

const Button = styled.button`
  border: none;
  padding: 8px 12px;
  margin-top: 24px;
  border-radius: 4px;
  background: #333;
  color: white;
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.5;
  cursor: pointer;

  &:hover {
    background: #444;
  }
  &:active {
    background: #555;
  }
`;
