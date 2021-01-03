import React from 'react';

const DownloadButton = ({ file, filename }) => {
  return (
    <div>
      <a href={file} download={filename}>
        Download File
      </a>
    </div>
  );
};

export default DownloadButton;
