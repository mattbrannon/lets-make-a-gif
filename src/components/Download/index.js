import styled from 'styled-components/macro';

export default function Download({ ...data }) {
  if (data.source) {
    return (
      <DownloadButton href={data.source} download={data.filename}>
        Download {data.filename.split('.').slice(-1)}
      </DownloadButton>
    );
  }
  return null;
}

const DownloadButton = styled.a`
  font-weight: 800;
  padding: 12px 18px;
  background: blue;
  color: white;
  font-weight: 800;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  text-align: center;

  &:hover {
    background: darkblue;
  }
  &:active {
    background: midnightblue;
  }
`;
