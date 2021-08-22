import { useEffect } from 'react';
import styled from 'styled-components/macro';

export default function UploadForm({ kind, handleFileUpload }) {
  useEffect(() => {});

  const handleUpload = (e) => {
    if (e.target.files.length) {
      handleFileUpload(e);
    }
  };

  return (
    <FormWrapper onSubmit={(e) => e.preventDefault()}>
      <Filepicker kind={kind} onChange={handleUpload} />
      <Label tabIndex={0}>Upload some files</Label>
    </FormWrapper>
  );
}

const FormWrapper = styled.form.attrs({
  action: '/upload',
  method: 'post',
  encType: 'multipart/form-data',
})`
  text-align: center;
  margin: 16px 0;
  grid-column: 2;
  grid-row: 2
  align-self: end;
`;

const Filepicker = styled.input.attrs((p) => {
  return {
    type: 'file',
    name: 'file',
    id: 'fileUpload',
    multiple: p.kind === 'image',
    accept: p.kind === 'image' ? 'image/*' : 'video/*',
  };
})`
  width: 0;
  height: 0;
  visibility: hidden;
`;

const Label = styled.label.attrs({
  htmlFor: 'fileUpload',
})`
  font-size: 1.1rem;
  color: deeppink;
  font-weight: 700;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  &:hover {
    color: hsl(328, 100%, 35%);
    cursor: pointer;
  }
`;
