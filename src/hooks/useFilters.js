import { useState } from "react";

const hueFilter = {  hue: false, saturation: false, brightness: false };
const rest = {
  emboss: false ,
  vflip: false,
  hflip: false,
  fps: false,
}


const useFilters = () => {
  const [hue, setHue] = useState(hueFilter);
  const [options, setOptions] = useState(rest);
  const filters = { ...hue, setHue, ...options, setOptions, result: {}};
  return filters;
}

export default useFilters