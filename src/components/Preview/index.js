import styled from 'styled-components/macro';

export default function Preview({ ...data }) {
  const Component = data.source || data.backup ? Image : null;
  return (
    <Wrapper size={data.size}>
      <Component {...data} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  place-self: center;
  max-width: ${(p) => (p.size.width > 320 ? 320 + 'px' : p.size.width + 'px')};
  max-height: 240px;
  height: 100%;
  width: 100%;
  grid-column: 2;
`;

function Image({ size, source, backup }) {
  return <PreviewImage size={size} src={source || backup} />;
}

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
