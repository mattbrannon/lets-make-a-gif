import styled from 'styled-components/macro';
import LoadingSpinner from '../LoadingSpinner';
import Preview from '../Preview';
import StatusInfo from '../StatusInfo';

export default function ContentArea({ ...data }) {
  return (
    <ContentWrapper>
      {data.status.isUploading ? (
        <LoadingSpinner {...data} />
      ) : data.source ? (
        <Preview {...data} />
      ) : (
        <StatusWrapper>
          <StatusInfo {...data} />
        </StatusWrapper>
      )}
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 100%;
  grid-column: 2;
`;

const StatusWrapper = styled.div`
  margin: 48px auto;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;
