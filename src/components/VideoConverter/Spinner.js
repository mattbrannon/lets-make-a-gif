import React from 'react';
import s from './style.module.css';

const Spinner = () => {
  return (
    <div>
      <p>Converting your video...</p>
      <div className={s.spinner__container}>
        <div className={s.spinner}></div>
      </div>
    </div>
  );
};

export default Spinner;
