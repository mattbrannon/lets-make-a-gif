import axios from 'axios';

const config = {
  method: 'post',
  baseUrl: 'http://localhost:4000/',
  url: 'upload-video',
  onUploadProgress: function (progressEvent) {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    console.log(percentCompleted);
  },
};

export const uploadVideo = async data => {
  try {
    const response = await axios.post(
      'http://localhost:4000/upload-video',
      data,
      config
    );
    return await response.data;
  } catch (error) {
    console.error('AXIOS ERROR ->', error.message);
  }
};

export const downloadVideo = async () => {
  try {
    const response = await fetch('http://localhost:4000/download');
    const blob = await response.blob();
    const objectUrl = await URL.createObjectURL(blob);
    return objectUrl;
  } catch (error) {
    console.error(error);
  }
};

// export default uploadVideo;
