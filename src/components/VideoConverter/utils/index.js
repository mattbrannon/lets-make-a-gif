import axios from 'axios';

const config = {
  method: 'post',
  baseUrl: 'http://localhost:4000/',
  url: 'upload',
  onUploadProgress: function (progressEvent) {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    console.log(percentCompleted);
  },
};

const uploadVideo = async data => {
  try {
    const response = await axios.post(
      'http://localhost:4000/upload',
      data,
      config
    );
    return await response.data;
  } catch (error) {
    console.error('AXIOS ERROR ->', error.message);
  }
};

export default uploadVideo;
