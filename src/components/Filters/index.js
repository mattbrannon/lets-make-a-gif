import styled from 'styled-components/macro';
import Toggle from '../Toggle';
import SubmitButton from '../SubmitButton';
// import { useEffect } from 'react';

export default function FiltersPanel({ frames, ...data }) {
  const {
    data: { filter, applyFilters, status },
  } = data;

  const {
    filters,
    handleSpecial,
    handleToggle,
    adjustEq,
    adjustFramerate,
    adjustFrei0r,
    adjustHue,
    adjustTmix,
  } = filter;

  const hue = filters.hue.h || 0;
  const brightness = filters.hue.b || 0;
  const saturation = filters.hue.s;
  const tmix = filters.tmix.frames || 0;
  const maxTmix = Math.min(frames, 10);
  const fps = filters.framerate;

  return (
    <Container>
      <Grid>
        <Cell min="-1" max="360" value={keepHueInRange(hue)} name="hue" step="1.0" onChange={adjustHue} />
        <Cell min="-10" max="10" step="0.1" name="saturation" value={saturation} onChange={adjustHue} />
        <Cell min="-10" max="10" step="0.1" name="brightness" value={brightness} onChange={adjustHue} />
        <Cell min="1" max="120" step="1.0" value={fps} name="framerate" onChange={adjustFramerate} />
        <Cell min="-10" max="100" step="0.1" name="contrast" onChange={adjustEq} />
        <Cell min="0" max="10" step="0.1" name="gamma" onChange={adjustEq} />
        <Cell id="tmix" min="0" max={maxTmix} name="tmix" value={tmix} onChange={adjustTmix} />
        <Cell id="rgbnoise" min="0.0" max="1.0" step="0.01" name="rgbnoise" onChange={adjustFrei0r} />
        <Cell id="vertigo" min="0.0" max="1.0" step="0.01" name="vertigo" onChange={adjustFrei0r} />
        <Cell id="cartoon" min="0" max="100" name="cartoon" step="1" onChange={adjustFrei0r} />
        <Cell handleToggle={handleToggle} name="negate" />
        <Cell handleToggle={handleSpecial} name="emboss" />
        <Cell handleToggle={handleSpecial} name="sepia" />
        <Cell handleToggle={handleSpecial} name="mirror" />
        <Cell handleToggle={handleSpecial} name="glitch" />
        <Cell handleToggle={handleToggle} name="random" />
        <Cell handleToggle={handleToggle} name="reverse" />
        <Cell handleToggle={handleToggle} name="hflip" />
        <Cell handleToggle={handleToggle} name="vflip" />
        <Cell handleToggle={handleSpecial} name="greyscale" />
      </Grid>
      <ButtonWrapper>
        <SubmitButton status={status} applyFilters={applyFilters}>
          Apply Filters
        </SubmitButton>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  background-color: hsla(40deg 35% 65% / 0.7);
  border-top: 2px solid black;
  position: relative;
  bottom: 0;
  left: 0;
  grid-column: 1 / -1;
  overflow-y: auto;
  grid-row: 4;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  /* max-height: 380px; */
`;

const ButtonWrapper = styled.div`
  display: grid;
  place-content: center;
  border-top: 2px solid black;
  padding-top: 0;
  height: 100;
  background: beige;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(240px, 100%), 1fr));
  column-gap: 24px;
  justify-items: center;
  grid-row: 2;
  overflow-y: auto;
  margin: auto 0;
  max-height: 380px;
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

const Cell = ({ name, ...rest }) => {
  const labelText = name.charAt(0).toUpperCase() + name.slice(1);
  const Component = rest.min !== undefined ? NumberInput : Toggle;
  return (
    <Label htmlFor={name}>
      <TextLabel>{labelText}</TextLabel>
      <Component {...rest} name={name} id={name} />
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
