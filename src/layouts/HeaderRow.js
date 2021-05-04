import styled from 'styled-components/macro';

export default function HeaderRow({ children, ...props }) {
  console.log(props);
  const Component = props.sticky ? StickyRow : props.fixed ? FixedRow : Row;
  return (
    <Wrapper {...props}>
      <Component {...props}>{children}</Component>
    </Wrapper>
  );
}

export const Wrapper = styled.header`
  height: ${(props) => props.height}px;
  min-height: 80px;
  position: relative;
  /* background: lightgrey; */
`;

const Row = styled.div`
  background: ${(props) => Object.keys(props)[0]};

  display: flex;

  align-items: baseline;
  padding: 1rem;
  gap: 16px;
  &:first-child {
    margin-right: auto;
  }
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
