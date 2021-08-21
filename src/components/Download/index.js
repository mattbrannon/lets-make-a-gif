import styled from 'styled-components/macro';

export default function Download({ ...data }) {
  if (data.source) {
    return (
      <DownloadButtonWrapper>
        <DownloadButton href={data.source} download={data.filename}>
          Download {data.filename.split('.').slice(-1)}
        </DownloadButton>
      </DownloadButtonWrapper>
    );
  }
  return null;
}

const DownloadButtonWrapper = styled.div`
  padding: 4px;
  border-radius: 8px;
  max-width: 160px;
  margin: 0 auto;
  grid-column: 2;
  grid-row: 3;
`;

const DownloadButton = styled.a`
  font-weight: 800;
  color: blue;
  margin-bottom: 16px;
  margin-top: 16px;
  width: 100%;
  display: grid;
  place-items: center;

  &:hover {
    color: darkblue;
  }
`;
