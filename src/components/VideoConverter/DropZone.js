import React from 'react';
import s from './style.module.css';
import dropIcon from './images/dropIcon.svg';

const DropZone = ({
  dropSpot,
  handleDrag,
  handleDrop,
  filePicker,
  handleInputChange,
  children,
}) => {
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
      <img src={dropIcon} alt="drop files here" className={s.upload__icon} />
      <div className={s.inputWrapper}>
        <input
          type="file"
          name="file"
          ref={filePicker}
          onChange={handleInputChange}
          id="fileElem"
          accept="video/*,.mkv"
          style={{ display: 'none' }}
        />
        <label htmlFor="fileElem">
          <strong className={s.label__strong}>Choose a file </strong>
          or drag it here
        </label>
        {children}
      </div>
    </form>
  );
};

export default DropZone;
