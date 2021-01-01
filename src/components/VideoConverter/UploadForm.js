import React from 'react';
import s from './style.module.css';

const UploadForm = ({ filePicker, handleChange, handleUploadButtonClick }) => {
  return (
    <div className={s.inputWrapper}>
      <input
        type="file"
        name="file"
        ref={filePicker}
        onChange={handleChange}
        id="fileElem"
        multiple
        accept={'video/*'}
        style={{ display: 'none' }}
      />
      <label htmlFor="fileElem">
        <strong>Choose a file </strong>
        or drag it here
      </label>
      {/* <button onClick={handleUploadButtonClick} className={s.uploadButton}>
       Choose a file or drag it here
      </button> */}
    </div>
  );
};

export default UploadForm;
