import styled from 'styled-components/macro';
import { Link } from '@reach/router';

export default function NotFoundPage() {
  return (
    <Wrapper>
      <code>Whoops, nothing here...</code>
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
