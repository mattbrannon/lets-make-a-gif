import React from 'react';
import s from './styles/style.module.css';
import dropIcon from './images/dropIcon.svg';

const UploadForm = ({ filePicker, handleInputChange, multiple, accept }) => {
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
          accept={accept}
          style={{ display: 'none' }}
          multiple={multiple}
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
