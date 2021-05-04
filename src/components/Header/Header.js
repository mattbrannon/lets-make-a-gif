import React from 'react';
import { Link } from '@reach/router';
import HeaderRow from '../../layouts/HeaderRow';
import styled from 'styled-components/macro';

export default function Header(props) {
  return (
    <HeaderRow {...props}>
      <Link to="/">
        <TitleLink>Let's Make a GIF</TitleLink>
      </Link>
    </HeaderRow>
  );
}

const TitleLink = styled.h2`
  /* font-family: skater; */
  /* font-family: cursive; */
  font-weight: 700;
  font-size: 28px;
  color: hsl(55, 100%, 60%);
  text-shadow: -1px -1px 1px #303030, -2px -2px 1px #101010;
  letter-spacing: 5px;
`;
