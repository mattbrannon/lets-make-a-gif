import React from 'react';

const ProgressMeter = ({ percentComplete }) => {
  return (
    <div>
      <progress value={percentComplete} max={100}></progress>
    </div>
  );
};

export default ProgressMeter;
