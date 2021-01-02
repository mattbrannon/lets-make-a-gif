import React from 'react';
import s from './style.module.css';

const DropZone = ({ dropSpot, handleDrag, handleDrop, children }) => {
  return (
    <form
      ref={dropSpot}
      className={s.uploadForm}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      method="post"
      encType="multipart/form-data"
    >
      {children}
    </form>
  );
};

export default DropZone;
