import { useState, useEffect } from "react";

const useProgressEvent = (progressEvent) => {
  const [percentComplete, setPercentComplete] = useState(0);

  useEffect(() => {
    const amount = Math.round(progressEvent.loaded * 100 / progressEvent.total) ;
    setPercentComplete(amount);
  }, [progressEvent])
  
  return percentComplete
};

export default useProgressEvent