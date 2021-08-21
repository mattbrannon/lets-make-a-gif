import { useEffect, useState } from 'react';
import { usePrevious } from './usePrevious';
const initialFilters = {
  hue: {
    h: '',
    s: 1,
    b: '',
  },
  eq: {
    contrast: '',
    saturation: '',
    brightness: '',
    gamma: '',
    gamma_r: '',
    gamma_g: '',
    gamma_b: '',
  },
  exposure: {
    exposure: '',
    black: '',
  },
  tmix: {
    frames: '',
  },
  emboss: {
    active: false,
    value: 'convolution=-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2',
  },
  mirror: {
    active: false,
    value: 'crop=iw/2:ih:0:0,split[left][tmp];[tmp]hflip[right];[left][right] hstack',
  },
  sepia: {
    active: false,
    value: 'colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131',
  },
  glitch: {
    active: false,
    value: 'frei0r=glitch0r:0.04|0.08|0.03|0.07',
  },
  cartoon: {
    active: false,
    value: 'frei0r=cartoon:0.800',
  },
  greyscale: {
    active: false,
    value: 'colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3',
  },
  frei0r: {
    rgbnoise: '',
    vertigo: '',
    cartoon: '',
  },
  framerate: 1,
  hflip: false,
  vflip: false,
  reverse: false,
  random: false,
};

function toCartoonValue(n) {
  return Number((9 / 10 + n * 0.001).toFixed(3));
}

const buildArgs = (obj) => {
  return Object.entries(obj)
    .filter((arr) => isNumber(arr[1]))
    .filter((arr) => arr[1] !== 0)
    .map((args) => args.join('='))
    .filter((v) => v)
    .flat(Infinity)
    .join(':');
};

export const useFilters = () => {
  const [ filters, setFilters ] = useState(initialFilters);
  const [ filterString, setFilterString ] = useState('');
  const previous = usePrevious(filters);
  const [ data, setData ] = useState([]);

  useEffect(() => {
    const updateFilters = () => {
      for (const key in filters) {
        if (filters[key] !== previous[key] && key !== 'framerate') {
          if (typeof filters[key] === 'object') {
            if ('active' in filters[key]) {
              handlePresetFilterChanges(filters, key);
            }
            else if (key === 'frei0r') {
              handleFrei0rFilterChanges(key);
            }
            else {
              handleComplexFilterChanges(filters, previous, key);
            }
          }
          else if (typeof filters[key] === 'boolean') {
            handleBooleanFilterChanges(filters, key);
          }
        }
      }
      setFilterString(data.join(','));
    };

    if (filters && previous) {
      updateFilters();
    }
  }, [ filters, previous, filters.framerate ]);

  const handleComplexFilterChanges = (curr, prev, key) => {
    if (hasNumber(curr[key]) && key !== 'frei0r') {
      const newNums = buildArgs(curr[key]);
      const oldNums = buildArgs(prev[key]);

      const newArgs = newNums.length ? `${key}=${newNums}` : '';
      const oldArgs = oldNums.length ? `${key}=${oldNums}` : '';

      const hasArgs = data.filter((v) => v).some((val) => val === oldArgs);
      if (!hasArgs) {
        const clone = [ ...data ].filter((v) => v);
        setData([ ...clone, newArgs ]);
      }
      else {
        const updated = [ ...data ]
          .filter((v) => v.length)
          .map((val) => {
            return val === oldArgs ? newArgs : val;
          });
        const final = updated.filter((value) => value.length > 0);
        setData(final);
      }
    }
  };

  const handlePresetFilterChanges = (curr, key) => {
    if (curr[key].active) {
      setData([ ...data, curr[key].value ]);
    }
    else {
      const clone = [ ...data ];
      const oldVal = curr[key].value;
      clone.splice(data.indexOf(oldVal), 1);
      setData(clone);
    }
  };

  const handleFrei0rFilterChanges = (key) => {
    for (let prop in filters[key]) {
      const currValue = filters[key][prop];
      const prevValue = previous[key][prop];

      if (currValue !== prevValue) {
        const currFilter = `${key}=${prop}:${currValue}`;
        const prevFilter = `${key}=${prop}:${prevValue}`;
        if (currValue === 0) {
          const clone = [ ...data ].filter((value) => {
            return value !== currFilter && value !== prevFilter;
          });
          setData(clone);
        }
        else if (!data.includes(prevFilter)) {
          setData([ ...data, currFilter ]);
        }
        else {
          const clone = [ ...data ].map((value) => {
            if (value === prevFilter) {
              value = currFilter;
            }
            return value;
          });
          setData(clone);
        }
      }
    }
  };

  const handleBooleanFilterChanges = (curr, key) => {
    if (curr[key]) {
      setData([ ...data, key ]);
    }
    else {
      const updated = [ ...data ].filter((val) => val !== key);
      setData(updated);
    }
  };

  const handleToggle = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.checked });
  };

  const handleSpecial = (e) => {
    const name = { ...filters[e.target.name] };
    setFilters({ ...filters, [e.target.name]: { ...name, active: e.target.checked } });
  };

  const adjustHue = (e) => {
    const value = Number(e.target.value);
    const key = e.target.name.charAt(0);
    const { hue } = filters;
    setFilters({ ...filters, hue: { ...hue, [key]: value } });
  };

  const adjustEq = (e) => {
    const { eq } = filters;
    const value = Number(e.target.value);
    const name = e.target.name;
    setFilters({ ...filters, eq: { ...eq, [name]: value } });
  };

  const adjustFrei0r = (e) => {
    const { frei0r } = filters;
    let value = Number(e.target.value);
    if (e.target.name === 'cartoon') {
      value = value === 0 ? value : toCartoonValue(e.target.value);
    }
    setFilters({ ...filters, frei0r: { ...frei0r, [e.target.name]: value } });
  };

  const adjustTmix = (e) => {
    const { tmix } = filters;
    const value = Number(e.target.value);
    if (value === 0) {
      const prev = tmix.frames;
      const clone = [ ...data ].filter((v) => v !== `tmix=frames=${prev}`);
      setData(clone);
      setFilters({ ...filters, tmix: { ...tmix, frames: '' } });
    }
    else {
      setFilters({ ...filters, tmix: { ...tmix, frames: value } });
    }
  };

  const adjustFramerate = (e) => {
    const value = Number(e.target.value);
    const framerate = value < 1 ? 1 : value;
    setFilters({ ...filters, framerate });
  };

  const setFramerate = (n) => {
    setFilters({ ...filters, framerate: n });
  };

  return {
    filters,
    handleToggle,
    handleSpecial,
    adjustHue,
    adjustEq,
    adjustFrei0r,
    adjustFramerate,
    setFramerate,
    adjustTmix,
    filterString,
  };
};

function isNumber(v) {
  return typeof v === 'number' && !isNaN(v);
}

function hasNumber(obj) {
  if (getType(obj) === 'object') {
    return !!Object.values(obj).filter(isNumber).length;
  }
  return false;
}

function getType(val) {
  return Object.prototype.toString
    .call(val)
    .slice(8, -1)
    .toLowerCase();
}
