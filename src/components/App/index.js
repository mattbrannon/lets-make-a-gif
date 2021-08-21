import { Router } from '@reach/router';
import styled from 'styled-components/macro';

import HomePage from '../Home';
import Header from '../Header';
import Main from './Main';

const App = () => {
  return (
    <>
      <Header>Let's Make a Gif</Header>
      <CustomRouter>
        <HomePage path="/" />
        <Main kind="image" path="image" />
        <Main kind="video" path="video" />
      </CustomRouter>
    </>
  );
};

const CustomRouter = styled(Router)`
  height: calc(100% - var(--headerHeight));
`;

export default App;
