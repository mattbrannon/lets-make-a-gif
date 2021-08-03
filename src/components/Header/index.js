import styled, { keyframes } from 'styled-components/macro';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { Link } from '@reach/router';

const shift = keyframes`
  0%{
    --color1: var(--green);
    --color2: var(--purple);
    --color3: var(--orange);
  }
  25%{
    --color1: var(--orange);
    --color2: var(--green);
    --color3: var(--purple);
  }

  50%{
    --color1: var(--purple);
    --color2: var(--orange);
    --color3: var(--green);
  }

  75%{
    --color1: var(--orange);
    --color2: var(--green);
    --color3: var(--purple);
  }

  100%{
    --color1: var(--green);
    --color2: var(--purple);
    --color3: var(--orange);
  }

`;

const MainText = styled.h1`
  background: repeating-linear-gradient(white 0px, white 5px, black 5px, black 10px);

  -webkit-background-clip: text;
  background-clip: text;
  filter: drop-shadow(0.05em 0.05em 0.01em #222);

  animation: ${shift} 3000ms infinite;
`;

const TextWrapper = styled.div`
  position: relative;
  --green: hsla(90deg, 100%, 35%, 0.8);
  --purple: hsla(330deg, 100%, 55%, 0.8);
  --orange: hsla(30deg, 100%, 55%, 0.8);

  --color1: var(--green);
  --color2: var(--purple);
  --color3: var(--orange);

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Header({ children, ...props }) {
  const Component = props.sticky ? StickyRow : props.fixed ? FixedRow : Row;
  return (
    <Wrapper {...props}>
      <Component {...props}>
        <MaxWidthWrapper size="90ch">
          <ContentWrapper>

            <TextWrapper {...props}>
              <Link to="/">
              <MainText {...props}>
                <FirstWord>Let's </FirstWord>
                <SecondWord>Make </SecondWord>
                <ThirdWord>a Gif</ThirdWord>
              </MainText>
              </Link>
            
            </TextWrapper>

          </ContentWrapper>
        </MaxWidthWrapper>
      </Component>
    </Wrapper>
  );
}



const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

// const NavWrapper = styled.nav`
//   display: flex;
//   gap: 32px;
// `;

const FirstWord = styled.span`
  color: var(--color1);
`;
const SecondWord = styled.span`
  color: var(--color2);
`;
const ThirdWord = styled.span`
  color: var(--color3);
`;

export const Wrapper = styled.header`
  height: var(--headerHeight);
  /* grid-column: 1 / span 2;
  grid-row: 1; */
  position: relative;
`;

const Row = styled.div`
  height: inherit;

  background: aliceblue;
  background: ${(props) => Object.keys(props)[0]};

  display: flex;
  align-items: center;
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
