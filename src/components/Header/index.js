import styled, { keyframes } from 'styled-components/macro';

const shift = keyframes`
  0%{
    --a: var(--color1);
    --b: var(--color2);
    --c: var(--color3);
  }
  25%{
    --a: var(--color3);
    --b: var(--color1);
    --c: var(--color2);
  }

  50%{
    --a: var(--color2);
    --b: var(--color3);
    --c: var(--color1);
  }

  75%{
    --a: var(--color3);
    --b: var(--color1);
    --c: var(--color2);
  }

  100%{
    --a: var(--color1);
    --b: var(--color2);
    --c: var(--color3);
  }

`;

const MainText = styled.h1`
  background: linear-gradient(
    90deg,
    var(--a) 0%,
    var(--a) 30%,
    var(--b) 30%,
    var(--b) 66%,
    var(--c) 66%,
    var(--c) 100%
  );

  /* background: repeating-linear-gradient(white 0%, white 1%, black 1%, black 2%); */

  -webkit-background-clip: text;
  background-clip: text;
  --webkit-text-fill-color: currentColor;
  color: transparent;
  filter: drop-shadow(0.04em 0.04em 0.01em #222);

  /* text-align: center; */

  animation: ${shift} 3000ms infinite;
`;

const TextWrapper = styled.div`
  position: relative;

  --color1: hsla(90deg, 100%, 55%, 0.8);
  --color2: hsla(330deg, 100%, 55%, 0.8);
  --color3: hsla(30deg, 100%, 55%, 0.8);

  --a: var(--color1);
  --b: var(--color2);
  --c: var(--color3);

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;


export default function Header ({ children, ...props }) {
  // const randomColor = () => '#' + Math.random().toString(16).slice(2, 8);

  const Component = props.sticky ? StickyRow : props.fixed ? FixedRow : Row;
  return (
    <Wrapper {...props}>
      <Component {...props}>
        <TextWrapper {...props}>
          <MainText {...props}>{children}</MainText>
        </TextWrapper>
      </Component>
    </Wrapper>
  );
}

export const Wrapper = styled.header`
  height: var(--headerHeight);
  position: relative;
`;

const Row = styled.div`
  height: inherit;

  background: aliceblue;
  background: ${props => Object.keys(props)[0]};

  display: flex;
  align-items: baseline;
  padding: 1rem;
  gap: 16px;
  /* &:first-child {
    margin-right: auto;
  } */
  border-bottom: 1px solid hsla(0deg, 0%, 0%, 0.5);
`;

const StickyRow = styled(Row)`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
`;

const FixedRow = styled(Row)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;
