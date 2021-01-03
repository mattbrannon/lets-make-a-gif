import React from 'react';
import './App.css';
import { Router } from '@reach/router';

import VideoConverter from './components/VideoConverter/ConvertVideo';
import ImageConverter from './components/ImageConverter/ConvertImages';
import HomePage from './components/HomePage/HomePage';

const App = () => {
  return (
    <div className="App">
      <Router>
        <HomePage path="/" />
        <ImageConverter path="image" />
        <VideoConverter path="video" />
      </Router>
    </div>
  );
};

export default App;
