import styled from 'styled-components/macro';
import MaxWidthWrapper from '../MaxWidthWrapper';

export default function SubmitButton({ children, ...props }) {
  const {
    status: { isUpdating, isUploading },
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isUpdating) {
      props.applyFilters();
    }
  };

  return (
    <ButtonWrapper>
      <ApplyFilterButton disabled={isUpdating || isUploading} onClick={handleSubmit}>
        {children}
      </ApplyFilterButton>
    </ButtonWrapper>
  );
}

const ApplyFilterButton = styled.button`
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: 800;
  background: deeppink;
  color: white;

  border-radius: 8px;
  border: none;
  width: 100%;
  &:hover {
    background: hsl(328, 100%, 35%);
    cursor: pointer;
  }
  &:disabled {
    background: grey;
  }
`;

const ButtonWrapper = styled(MaxWidthWrapper)`
  border-radius: 10px;
  align-self: start;
  grid-column: 2;
  grid-row: 2;
  padding: 16px 0;
`;
