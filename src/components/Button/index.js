import styled from 'styled-components/macro';
import { Link } from '@reach/router';

export default function Button ({ children, ...props }) {
  return (
    <ButtonWrapper {...props}>
      <Link to={props.href}>
        <ButtonFace {...props}>{children}</ButtonFace>
      </Link>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button`
  background: hsla(220deg, 100%, 30%, 1);
  border-radius: 12px;
  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
`;

const ButtonFace = styled.span`
  background: radial-gradient(
    ellipse,
    hsla(245deg, 100%, 44%, 1) 15%,
    hsla(245deg, 100%, 36%, 1) 100%
  );

  display: block;
  padding: 24px 12px;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 600;

  color: whitesmoke;
  text-shadow: 0 0.08em 0.03em hsla(0deg, 0%, 0%, 0.4);

  /* text-shadow: -2px 1px 1px hsla(0deg, 0%, 0%, 0.4); */

  transform: translateY(-8px);

  &:active {
    transform: translateY(-2px);
    transition: transform 44ms;
  }
`;
