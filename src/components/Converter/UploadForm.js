import React from 'react';
import dropIcon from './images/dropIcon.svg';
import styled from 'styled-components/macro';

export default function UploadForm({ filePicker, handleInputChange, multiple, accept }) {
  return (
    <>
      <Icon src={dropIcon} alt="drop files here" />
      <div>
        <input
          type="file"
          name="file"
          ref={filePicker}
          onChange={handleInputChange}
          id="fileElem"
          accept={accept}
          style={{ display: 'none' }}
          multiple={multiple}
        />
        <label htmlFor="fileElem">
          <BoldLabel>Choose a file </BoldLabel>
          or drag it here
        </label>
      </div>
    </>
  );
}

const Icon = styled.img`
  margin: clamp(calc(2 * var(--unit)), calc(3 * var(--unit)), calc(4 * var(--unit)));
`;

const BoldLabel = styled.strong`
  display: block;
  padding-bottom: 4px;
  font-weight: bold;
  color: black;
  &:hover {
    color: dimgray;
  }
`;
