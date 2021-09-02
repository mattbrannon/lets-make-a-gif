import styled from 'styled-components/macro';
import { forwardRef } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';

export const Preview = forwardRef(({ source }, imageRef) => {
  const { height } = useWindowSize();
  return <Image ref={imageRef} src={source} height={height} />;
});

const Image = styled.img`
  grid-column: 1 / -1;
  grid-row: 1;
  max-width: 512px;
  max-height: ${(p) => p.height / 2.5}px;
  width: 100%;
  height: auto;
  object-fit: contain;
  justify-self: center;
`;

Preview.displayName = 'Preview';
