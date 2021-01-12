import React from 'react';
import { Link } from '@reach/router';
const Header = () => {
  return (
    <header>
      <div className="outer_header">
        <div className="inner_header">
          <Link to="/">
            <h2>Let's Make a GIF</h2>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
