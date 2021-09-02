import styled from 'styled-components/macro';
import { Link } from '@reach/router';
import wrongway from './wrongway.gif';
import MaxWidthWrapper from '../MaxWidthWrapper';

export default function NotFoundPage() {
  return (
    <Wrapper>
      <Message>Whoops! We must have taken a wrong turn at Albuquerque</Message>
      <MaxWidthWrapper>
        <img src={wrongway} height="auto" width="100%" />
      </MaxWidthWrapper>
      <Link to="/">
        <Button>Back to safety</Button>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 24px;
  margin-top: -48px;
`;

const Message = styled.code`
  margin-bottom: 1rem;
`;

const Button = styled.button`
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  background: #333;
  color: white;
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.5;
  cursor: pointer;

  &:hover {
    background: #222;
  }
  &:active {
    background: #111;
  }
`;
