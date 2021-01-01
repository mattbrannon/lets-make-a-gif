import React from 'react';

const NavButton = ({ name, text }) => {
  return (
    <button className="choice" name={name}>
      {text}
    </button>
  );
};

export default NavButton;
