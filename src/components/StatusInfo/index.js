import styled from 'styled-components/macro';
import MaxWidthWrapper from '../MaxWidthWrapper';

export default function StatusInfo({ ...data }) {
  return (
    <StatusWrapper>
      {data.error ? (
        <ErrorMessage>{data.error}</ErrorMessage>
      ) : data.status.isUpdating ? (
        <UpdateMessage>{data.update}</UpdateMessage>
      ) : null}
    </StatusWrapper>
  );
}

const StatusWrapper = styled(MaxWidthWrapper)`
  padding: 4px;
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
  grid-column: 2;
  grid-row: 3;
  font-weight: 800;
  color: blue;
  margin-bottom: 16px;
  margin-top: 16px;
  width: 100%;
  display: grid;
  place-items: center;
`;

const ErrorMessage = styled.code`
  color: firebrick;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
`;

const UpdateMessage = styled.code`
  color: black;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
`;
