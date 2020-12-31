import React from 'react';
import { Link } from '@reach/router';

const HomePage = ({ handleButtonClick }) => {
  return (
    <div className="wrapper">
      <p>I want to...</p>
      <div className="choices">
        <Link to="video">
          <button
            name="videoPage"
            onClick={handleButtonClick}
            className="first"
          >
            Convert a video to a gif
          </button>
        </Link>
        <Link to="image">
          <button
            name="imagePage"
            onClick={handleButtonClick}
            className="second"
          >
            Convert images to a gif
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
