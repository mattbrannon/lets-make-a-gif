import styled from 'styled-components/macro';

export default function UploadButton({ ...props }) {
  const name = props.name === 'image' ? 'images' : props.name;
  const kind = name.charAt(0).toUpperCase() + name.slice(1);
  const buttonText = `Upload ${kind}`;
  if (!props.status.isUploading) {
    return <UploadButtonWrapper {...props}>{buttonText}</UploadButtonWrapper>;
  }
  return null;
}

const UploadButtonWrapper = styled.button`
  padding: 12px 18px;
  background: #333;
  color: white;
  font-weight: 800;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #444;
  }
  &:active {
    background: #555;
  }
  @media (max-width: 480px) {
    margin-top: 16px;
    padding: 8px;
    font-size: 0.8rem;
    width: fit-content;
  }
`;
