import React from 'react';
import { Router } from '@reach/router';

import VideoConverter from './components/VideoConverter/ConvertVideo';
import ImageConverter from './components/ImageConverter/ConvertImages';
import HomePage from './components/HomePage/HomePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

const App = () => {
  return (
    <div>
      <Router>
        <HomePage path="/" />
        <ImageConverter path="image" />
        <VideoConverter path="video" />
        <NotFoundPage default />
      </Router>
    </div>
  );
};

export default App;
