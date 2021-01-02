import React from 'react';
import s from './style.module.css';
import dropIcon from './images/dropIcon.svg';

const UploadForm = ({ filePicker, handleInputChange }) => {
  return (
    <>
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
      </div>
    </>
  );
};

export default UploadForm;
