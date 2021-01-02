import React, { Component } from 'react';

import Header from '../Header/Header';
import DropZone from './DropZone';
import DownloadButton from './DownloadButton';

import s from './style.module.css';

import { uploadVideo, downloadVideo } from './utils/index';

class VideoConverter extends Component {
  constructor(props) {
    super(props);
    this.dropSpot = React.createRef();
    this.filePicker = React.createRef();
    this.state = {
      videoSource: null,
    };
  }

  handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDrop = e => {
    e.stopPropagation();
    e.preventDefault();
    const dt = e.dataTransfer;
    const files = dt.files;
    this.handleFileUpload(files);
  };

  handleInputChange = e => {
    e.preventDefault();
    const files = this.filePicker.current.files;
    this.handleFileUpload(files);
  };

  handleFileUpload = files => {
    const data = new FormData();
    const file = files[0];
    data.append('file', file);
    uploadVideo(data)
      .then(() => downloadVideo())
      .then(videoSource => this.setState({ videoSource }))
      .catch(error => console.log('error in upload', error));
  };

  render() {
    return (
      <div>
        <Header />

        <div className={s.instructions}>
          <h3>Instructions:</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
            expedita nemo a? Odio, tempora commodi dicta voluptates
            necessitatibus magnam nulla eveniet cupiditate sed repudiandae
            incidunt asperiores ex unde omnis culpa.
          </p>
        </div>
        <DropZone
          dropSpot={this.dropSpot}
          filePicker={this.filePicker}
          handleDrag={this.handleDrag}
          handleDrop={this.handleDrop}
          handleInputChange={this.handleInputChange}
        >
          {this.state.videoSource ? (
            <DownloadButton
              file={this.state.videoSource}
              filename={'converted.gif'}
            />
          ) : null}
        </DropZone>
      </div>
    );
  }
}

export default VideoConverter;
