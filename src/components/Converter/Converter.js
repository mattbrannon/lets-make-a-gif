import React, { Component } from 'react';

import Header from '../Header/Header';
import DropZone from './DropZone';
import DownloadButton from './DownloadButton';
import ProgressMeter from './ProgressMeter';
import Spinner from './Spinner';
import UploadForm from './UploadForm';
import Instructions from './Instructions';

import { uploadVideo, uploadImages, downloadVideo, generateHash } from './utils/index';

class Converter extends Component {
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
      type: null,
      files: [],
      instructions: {
        video: [
          `Choose a video file on your computer that you'd like to convert to a gif`,
          `Length of video must be less than 1 minute long`,
          `Size of video must be less than 50mb`,
        ],
        image: [
          `Choose a series of images on your computer that you'd like to convert to a gif`,
          `Each image should be less than 5mb in size`,
          `You are limited to 100 images per upload`,
          `For best results, images should all be equal width and height`,
        ],
      },
    };
  }

  handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDrop = (e) => {
    this.handleDrag(e);
    const dt = e.dataTransfer;
    const files = dt.files;
    this.handleFileUpload(files);
  };

  handleInputChange = async (e) => {
    e.preventDefault();
    const files = this.filePicker.current.files;
    const filename = await generateHash(files[0].name);

    if (this.state.type === 'video' && this.state.filename !== filename) {
      this.setState({
        filename,
        videoSource: null,
        isConverting: false,
      });
      this.handleFileUpload(files);
    } else {
      console.log('we are here');
      this.handleMultipleFileUpload(files);
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const files = this.filePicker.current.files;

    const data = new FormData();
    for (let file of files) {
      data.append('file', file);
    }

    uploadImages(data)
      .then((result) => {
        console.log('here we are', { result });
        return result;
      })
      .then(downloadVideo)
      .then((videoSource) => this.setState({ videoSource }))
      .catch((error) => console.error('error in handleFileUpload', error));
  };

  handleMultipleFileUpload = (files) => {
    const data = new FormData();
    for (let file of files) {
      data.append('file', file);
    }
    this.setState({ uploadStarted: true });
  };

  updateProgress = (percentComplete) => {
    this.setState({ percentComplete });
  };

  handleFileUpload = (files) => {
    const data = new FormData();
    const file = files[0];
    data.append('file', file);
    this.setState({ uploadStarted: true });

    uploadVideo(data, this.updateProgress)
      .then(downloadVideo)
      .then((videoSource) => this.setState({ videoSource }))
      .catch((error) => console.error('error in handleFileUpload', error));
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

  componentDidMount() {
    const type = this.props.video ? 'video' : 'image';
    this.setState((prevState) => {
      return {
        ...prevState,
        type: type,
      };
    });
  }

  render() {
    return (
      <div>
        <Header background />
        <Instructions
          instructions={
            this.state.type === 'video'
              ? this.state.instructions.video
              : this.state.instructions.image
          }
        />
        <DropZone
          dropSpot={this.dropSpot}
          filePicker={this.filePicker}
          handleDrag={this.handleDrag}
          handleDrop={this.handleDrop}
        >
          {this.state.videoSource ? (
            <>
              <UploadForm
                handleInputChange={
                  this.state.type === 'video' ? this.handleInputChange : this.handleChange
                }
                filePicker={this.filePicker}
                multiple={this.state.type === 'video' ? false : true}
                accept={this.state.type === 'video' ? 'video/*,.mkv' : 'image/*'}
              />
              <DownloadButton file={this.state.videoSource} filename={'converted.gif'} />
            </>
          ) : this.state.uploadStarted && !this.state.isConverting ? (
            <ProgressMeter percentComplete={this.state.percentComplete} />
          ) : this.state.isConverting ? (
            <Spinner />
          ) : (
            <UploadForm
              handleInputChange={
                this.state.type === 'video' ? this.handleInputChange : this.handleChange
              }
              filePicker={this.filePicker}
              multiple={this.state.type === 'video' ? false : true}
              accept={this.state.type === 'video' ? 'video/*,.mkv' : 'image/*'}
            />
          )}
        </DropZone>
      </div>
    );
  }
}

export default Converter;
