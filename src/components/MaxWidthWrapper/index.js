import styled from 'styled-components/macro';

const MaxWidthWrapper = styled.div`
  max-width: ${(p) => p.size || `var(--pageWidth)`};
  width: 100%;
  margin: 0 auto;
  background: ${(p) => p.background};
`;

export default MaxWidthWrapper;
