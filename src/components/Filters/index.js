import styled from 'styled-components/macro';
import Toggle from '../Toggle';
import { useEffect, useState } from 'react';

export default function FiltersPanel(props) {
  const { applyFilters, resetFilters, filter, imageSize, setIsOpen, framerate, isOpen, status, setStatus } = props;
  const {
    filters,
    handleSpecial,
    handleToggle,
    adjustEq,
    adjustFramerate,
    adjustFrei0r,
    adjustHue,
    adjustTmix,
    handleReset,
  } = filter;

  const hue = filters.hue.h; //|| 0;
  const brightness = filters.hue.b; //|| 0;
  const saturation = filters.hue.s;
  const tmix = filters.tmix.framerate; //|| 0;
  const maxTmix = Math.min(framerate, 24);
  const fps = filters.framerate;
  const gamma = filters.eq.gamma;
  const contrast = filters.eq.contrast;
  const noise = filters.frei0r.rgbnoise;
  const vertigo = filters.frei0r.vertigo;
  // const cartoon = filters.frei0r.cartoon;

  const [ height, setHeight ] = useState(0);
  const [ reset, setReset ] = useState(false);

  useEffect(() => {
    if (imageSize) {
      setHeight(imageSize.height);
    }
  }, [ imageSize ]);

  useEffect(() => {
    if (reset) {
      handleReset();
      setReset(false);
    }
  }, [ reset ]);

  return (
    <Container>
      <Grid height={height} isOpen={isOpen}>
        <Cell min="-1" max="360" value={keepHueInRange(hue)} name="hue" step="1.0" onChange={adjustHue} />
        <Cell min="-10" max="10" step="0.1" name="saturation" value={saturation} onChange={adjustHue} />
        <Cell min="-10" max="10" step="0.1" name="brightness" value={brightness} onChange={adjustHue} />
        <Cell min="1" max="120" step="1.0" value={fps} name="framerate" onChange={adjustFramerate} />
        <Cell min="-10" max="10" step="0.1" name="contrast" value={contrast} onChange={adjustEq} />
        <Cell min="0" max="10" step="0.1" name="gamma" value={gamma} onChange={adjustEq} />
        <Cell id="tmix" min="0" max={maxTmix} name="tmix" value={tmix} onChange={adjustTmix} />
        <Cell id="rgbnoise" min="0.0" max="1.0" step="0.01" name="rgbnoise" value={noise} onChange={adjustFrei0r} />
        <Cell id="vertigo" min="0.0" max="1.0" step="0.01" name="vertigo" value={vertigo} onChange={adjustFrei0r} />
        <Cell reset={reset} checked={filters.cartoon.active} handleToggle={handleSpecial} name="cartoon" />
        <Cell reset={reset} checked={filters.negate} handleToggle={handleToggle} name="negate" />
        <Cell reset={reset} checked={filters.emboss.active} handleToggle={handleSpecial} name="emboss" />
        <Cell reset={reset} checked={filters.sepia.active} handleToggle={handleSpecial} name="sepia" />
        <Cell reset={reset} checked={filters.mirror.active} handleToggle={handleSpecial} name="mirror" />
        <Cell reset={reset} checked={filters.glitch.active} handleToggle={handleSpecial} name="glitch" />
        <Cell reset={reset} checked={filters.random} handleToggle={handleToggle} name="random" />
        <Cell reset={reset} checked={filters.reverse} handleToggle={handleToggle} name="reverse" />
        <Cell reset={reset} checked={filters.hflip} handleToggle={handleToggle} name="hflip" />
        <Cell reset={reset} checked={filters.vflip} handleToggle={handleToggle} name="vflip" />
        <Cell reset={reset} checked={filters.greyscale.active} handleToggle={handleSpecial} name="greyscale" />
        {/* <Spacer height={12} /> */}
      </Grid>
      <ButtonWrapper isOpen={isOpen}>
        <ShowHideButton isOpen={isOpen} setIsOpen={setIsOpen} />
        <UpdateButton setIsOpen={setIsOpen} isUpdating={status.isUpdating} applyFilters={applyFilters} />
        <ResetButton resetFilters={resetFilters} status={status} setStatus={setStatus} setReset={setReset} />
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  grid-column: 1 / -1;
  overflow-y: auto;
  grid-row: 4;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 48px 0;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  border-top: 2px solid black;
  padding-top: 0;
  background: beige;
  z-index: ${(p) => p.isOpen && 0};
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  max-height: var(--footerHeight);
  height: 100%;
`;

const Grid = styled.div`
  --imageHeight: ${(p) => p.height}px;
  --maxHeight: calc(100vh - var(--headerHeight) - var(--footerHeight) - var(--imageHeight));

  max-height: var(--maxHeight);

  /* height: 100%; */

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(240px, 100%), 1fr));
  column-gap: 24px;
  justify-items: center;
  grid-row: 2;
  overflow-y: auto;
  margin: auto 0;
  position: fixed;
  bottom: ${(p) => (p.isOpen ? 'var(--footerHeight)' : '-100%')};
  z-index: ${(p) => !p.isOpen && -1};
  width: 100%;
  border-top: 2px solid black;
  padding: 0 24px;
  min-height: 80px;

  background: hsl(40deg, 35%, 75%);
  transition: bottom 0.3s linear;

  /* Works on Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: beige;
    border: 2px solid lightgoldenrodyellow;
  }

  &::-webkit-scrollbar-thumb {
    background-color: slategrey;
    border-radius: 0px;
  }
`;

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  max-width: 180px;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 550px) {
    max-width: 240px;
  }
`;

const TextLabel = styled.span`
  display: block;
  font-weight: 800;
  font-size: 1rem;
  text-shadow: 1px 0px 3px #ddd, 0px -1px 3px #ddd;
  @media (max-width: 360px) {
    font-size: 0.8rem;
  }
`;

const Cell = ({ name, checked, reset, ...rest }) => {
  const labelText = name.charAt(0).toUpperCase() + name.slice(1);
  const Component = rest.min !== undefined ? NumberInput : Toggle;

  return (
    <Label htmlFor={name}>
      <TextLabel>{labelText}</TextLabel>
      <Component {...rest} reset={reset} checked={checked} name={name} id={name} />
    </Label>
  );
};

const Input = styled.input`
  padding: 4px 4px;
  font-size: 1rem;
  border-radius: 4px;
  @media (max-width: 360px) {
    font-size: 0.8rem;
  }
`;

const NumberInput = styled(Input).attrs({
  type: 'number',
})`
  background: '#eee';
  min-width: 56px;
  max-width: 56px;
  margin: 8px 0;
`;

const keepHueInRange = (hue) => {
  hue = Number(hue);
  while (hue >= 360 || hue < 0) {
    hue = hue >= 360 ? hue - 360 : hue < 0 ? hue + 360 : hue;
  }
  return hue;
};

const Button = styled.button`
  width: 100%;
  padding: 12px 18px;
  font-weight: 800;
  font-size: 1rem;
  margin: 0 auto;
  border: none;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const UpdateFiltersWrapper = styled(Button)`
  background: deeppink;
  color: white;
  border-left: 2px solid black;
  border-right: 2px solid black;

  &:hover {
    background: hsl(328, 100%, 35%);
  }
  &:active {
    background: hsl(328, 80%, 25%);
  }
  &:disabled {
    background: grey;
  }
`;

const ResetButtonWrapper = styled(Button)`
  background: hsl(40, 35%, 65%);
  color: white;
  &:hover {
    background: hsl(40, 35%, 50%);
  }
  &:active {
    background: hsl(40, 40%, 40%);
  }
  &:disabled {
    background: grey;
  }
`;

const ShowHideButtonWrapper = styled(Button)`
  background: hsl(210, 35%, 65%);
  color: white;
  &:hover {
    background: hsl(210, 35%, 50%);
  }
  &:active {
    background: hsl(210, 40%, 40%);
  }
  &:disabled {
    background: grey;
  }
`;

function UpdateButton({ ...props }) {
  const disabled = props.isUpdating;
  return (
    <UpdateFiltersWrapper disabled={disabled} onClick={props.applyFilters} {...props}>
      <span>Apply Filters</span>
    </UpdateFiltersWrapper>
  );
}

// const UpdateButton = forwardRef((props, ref) => {
//   const disabled = props.isUpdating;
//   return (
//     <UpdateFiltersWrapper ref={ref} disabled={disabled} onClick={props.applyFilters} {...props}>
//       <span>Apply Filters</span>
//     </UpdateFiltersWrapper>
//   );
// });

// UpdateButton.displayName = UpdateButton;

function ResetButton({ ...props }) {
  const handleReset = () => {
    const status = props.status;
    props.setReset(true);
    props.setStatus({ ...status, isReset: true });
    props.resetFilters();
  };
  return <ResetButtonWrapper onClick={handleReset}>Reset Filters</ResetButtonWrapper>;
}

function ShowHideButton({ ...data }) {
  const buttonText = data.isOpen ? 'Hide Filters' : 'Show Filters';
  const handleSubmit = (e) => {
    e.preventDefault();
    data.setIsOpen(!data.isOpen);
  };

  return <ShowHideButtonWrapper onClick={handleSubmit}>{buttonText}</ShowHideButtonWrapper>;
}
