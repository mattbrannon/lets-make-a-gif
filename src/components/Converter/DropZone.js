import React from 'react';
import styled from 'styled-components/macro';
const DropZone = ({ dropSpot, handleDrag, handleDrop, children }) => {
  return (
    <UploadForm>
      <form
        ref={dropSpot}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        method="post"
        encType="multipart/form-data"
      >
        {children}
      </form>
    </UploadForm>
  );
};

const UploadForm = styled.div`
  height: calc(100vh - 270px);
  min-height: 160px;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  background: lightgrey;
  border: 4px dashed grey;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
`;

export default DropZone;
