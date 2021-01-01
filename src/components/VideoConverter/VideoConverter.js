import React, { Component } from 'react';

import Header from '../Header/Header';
import DropZone from './DropZone';
// import UploadForm from './UploadForm';

import s from './style.module.css';

class VideoConverter extends Component {
  constructor(props) {
    super(props);
    this.dropSpot = React.createRef();
    this.filePicker = React.createRef();
    this.state = {};
  }

  handleUploadButtonClick = () => {
    this.filePicker.current.click();
  };

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

  handleFileUpload = files => {
    const data = new FormData();
    const file = files[0];
    data.append('file', file);
    for (const entry of data) {
      console.log(entry);
    }
  };

  handleInputChange = e => {
    e.preventDefault();
    const files = this.filePicker.current.files;
    const data = new FormData();

    const file = files[0];
    data.append('file', file);

    for (const entry of data) {
      console.log(entry);
    }
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
          handleUploadButtonClick={this.handleUploadButtonClick}
          handleDrag={this.handleDrag}
          handleDrop={this.handleDrop}
          handleInputChange={this.handleInputChange}
        ></DropZone>
      </div>
    );
  }
}

export default VideoConverter;
