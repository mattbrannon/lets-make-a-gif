import React from 'react';
import { Link } from '@reach/router';

import NavButton from './NavButton';
import s from './style.module.css';

const HomePage = () => {
  return (
    <div className="wrapper">
      <p className={s.text}>I want to...</p>
      <div className="choices">
        <Link to="video">
          <NavButton name="videoPage" text="Convert a video to a gif" />
        </Link>
        <Link to="image">
          <NavButton name="imagePage" text="Convert images to a gif" />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
