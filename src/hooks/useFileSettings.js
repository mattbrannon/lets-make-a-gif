import { useState, useEffect } from 'react';

const videoSettings = {
  multiple: false,
  accept: 'video/*,.mkv',
  path: '/upload-video',
  buttonText: 'Choose a video file',
};
const imageSettings = {
  multiple: true,
  accept: 'image/*',
  path: '/upload-images',
  buttonText: 'Choose some image files',
};

const useFileSettings = (type) => {
  const [options, setOptions] = useState({})

  useEffect(() => {
    const options = type === 'video' ? videoSettings : imageSettings;
    setOptions(options);
  }, [type, options])

  return options
};


export default useFileSettings;
