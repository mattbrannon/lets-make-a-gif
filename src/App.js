import React, { Component } from 'react';
import './App.css';
import { Router } from '@reach/router';

import VideoConverter from './components/VideoConverter/VideoConverter';
import ImageConverter from './components/ImageConverter/ImageConverter';
import HomePage from './components/HomePage/HomePage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoPage: false,
      imagePage: false,
    };
  }

  handleButtonClick = e => {
    this.setState(prevState => {
      return {
        [e.target.name]: !prevState[e.target.name],
      };
    });
  };

  componentDidMount() {
    this.setState({
      videoPage: false,
      imagePage: false,
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          {!this.state.imagePage && !this.state.videoPage ? (
            <HomePage path="/" handleButtonClick={this.handleButtonClick} />
          ) : this.state.imagePage ? (
            <ImageConverter path="image" />
          ) : this.state.videoPage ? (
            <VideoConverter path="video" />
          ) : null}
        </Router>
      </div>
    );
  }
}

export default App;
