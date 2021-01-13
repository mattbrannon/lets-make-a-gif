import axios from 'axios';

const handleProgressEvent = (progressEvent, setState) => {
  const percentComplete = Math.round(
    (progressEvent.loaded * 100) / progressEvent.total
  );
  setState(percentComplete);
};

export const uploadVideo = async (data, callback) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/upload-video',
      data,
      { onUploadProgress: e => handleProgressEvent(e, callback) }
    );
    return await response.data;
  } catch (error) {
    console.error('AXIOS ERROR ->', error.message);
  }
};

export const uploadImages = async data => {
  try {
    const response = await axios.post(
      'http://localhost:5000/upload-images',
      data
    );
    return await response.data;
  } catch (error) {
    console.log('AXIOS ERROR ->', error.message);
  }
};

export const downloadVideo = async () => {
  try {
    const response = await fetch('http://localhost:5000/download');
    const blob = await response.blob();
    const objectUrl = await URL.createObjectURL(blob);
    console.log(objectUrl);
    return objectUrl;
  } catch (error) {
    console.error(error);
  }
};

//https://stackoverflow.com/a/43383990
export const generateHash = filename => {
  let strBuf = new TextEncoder('utf-8').encode(filename);
  return crypto.subtle.digest('SHA-256', strBuf).then(hash => {
    let result = '';
    const view = new DataView(hash);
    for (let i = 0; i < hash.byteLength; i += 4) {
      result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
    }
    return result;
  });
};

// export default uploadVideo;
