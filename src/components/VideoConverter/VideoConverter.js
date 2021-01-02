import React, { Component } from 'react';

import Header from '../Header/Header';
import DropZone from './DropZone';
import DownloadButton from './DownloadButton';
import ProgressMeter from './ProgressMeter';
import Spinner from './Spinner';
import UploadForm from './UploadForm';

import s from './style.module.css';

import { uploadVideo, downloadVideo, generateHash } from './utils/index';

class VideoConverter extends Component {
  constructor(props) {
    super(props);
    this.dropSpot = React.createRef();
    this.filePicker = React.createRef();
    this.state = {
      uploadStarted: false,
      videoSource: null,
      percentComplete: 0,
      isConverting: false,
      filename: null,
    };
  }

  handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDrop = e => {
    this.handleDrag(e);
    const dt = e.dataTransfer;
    const files = dt.files;
    this.handleFileUpload(files);
  };

  handleInputChange = async e => {
    e.preventDefault();
    const files = this.filePicker.current.files;
    const filename = await generateHash(files[0].name);

    if (this.state.filename !== filename) {
      this.setState({ filename, videoSource: null, isConverting: false });
      this.handleFileUpload(files);
    }
  };

  updateProgress = percentComplete => {
    this.setState({ percentComplete });
  };

  handleFileUpload = files => {
    const data = new FormData();
    const file = files[0];
    data.append('file', file);
    this.setState({ uploadStarted: true });

    uploadVideo(data, this.updateProgress)
      .then(downloadVideo)
      .then(videoSource => this.setState({ videoSource }))
      .catch(error => console.error('error in handleFileUpload', error));
  };

  componentDidUpdate() {
    if (this.state.percentComplete === 100) {
      this.setState({
        isConverting: true,
        percentComplete: 0,
        uploadStarted: false,
      });
    }
  }

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
        >
          {this.state.videoSource ? (
            <>
              <UploadForm
                handleInputChange={this.handleInputChange}
                filePicker={this.filePicker}
              />
              <DownloadButton
                file={this.state.videoSource}
                filename={'converted.gif'}
              />
            </>
          ) : this.state.uploadStarted && !this.state.isConverting ? (
            <ProgressMeter percentComplete={this.state.percentComplete} />
          ) : this.state.isConverting ? (
            <Spinner />
          ) : (
            <UploadForm
              handleInputChange={this.handleInputChange}
              filePicker={this.filePicker}
            />
          )}
        </DropZone>
      </div>
    );
  }
}

export default VideoConverter;
