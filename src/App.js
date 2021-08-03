import React from 'react';
import { Router } from '@reach/router';

// import VideoConverter from './components/VideoConverter/ConvertVideo';
// import ImageConverter from './components/ImageConverter/ConvertImages';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
import Converter from './components/Converter';
import Header from './components/Header'
import GlobalStyle from './styles';

const App = () => {
  return (
    <>
      <GlobalStyle/>
      <Header>Let's Make a Gif</Header>
      <Router>
        <HomePage path="/" />
        <Converter kind="image" path="image" />
        <Converter kind="video" path="video" />
        <NotFoundPage default />
      </Router>
    </>
  );
};

export default App;
