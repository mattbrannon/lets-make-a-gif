import React from 'react';
import { Router } from '@reach/router';

import VideoConverter from './components/VideoConverter/ConvertVideo';
// import ImageConverter from './components/ImageConverter/ConvertImages';
import HomePage from './components/HomePage/HomePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import ImagesPage from './components/ImagesPage';

import Header from './components/Header'
import GlobalStyle from './styles';

const App = () => {
  return (
    <div>
      <GlobalStyle/>
      <Header>Let's Make a Gif</Header>
      <Router>
        <HomePage path="/" />
        <ImagesPage path="image" />
        <VideoConverter path="video" />
        <NotFoundPage default />
      </Router>
    </div>
  );
};

export default App;
