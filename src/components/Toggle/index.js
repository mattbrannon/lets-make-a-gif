import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/macro';

export default function Toggle({ ...props }) {
  const [ isChecked, setIsChecked ] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (props.reset) {
      setIsChecked(false);
    }
  }, [ props.reset ]);

  const handleKeyDown = (e) => {
    const codes = [ 13, 32 ];
    if (codes.includes(e.keyCode)) {
      ref.current.checked = !isChecked;
      setIsChecked(!isChecked);
    }
  };

  const handleChange = (e) => {
    setIsChecked(!isChecked);
    props.handleToggle(e);
  };

  return (
    <Wrapper onKeyDown={handleKeyDown} isChecked={isChecked}>
      <ToggleLabel tabIndex={0} htmlFor={props.id}>
        <VisuallyHidden>
          <Checkbox {...props} ref={ref} onChange={handleChange} />
        </VisuallyHidden>
        <Content />
      </ToggleLabel>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  --height: 28px;
  --width: calc(var(--height) * 2);
  --radius: 4px;
  --weight: 700;
  --fontSize: calc(var(--height) / 2);

  --grey: hsla(0deg, 0%, 50%, 1);
  --green: hsla(103, 66%, 24%, 1);
  --white: hsla(0deg, 0%, 100%, 1);

  --grey200: hsla(0deg, 0%, 0%, 0.2);
  --grey400: hsla(0deg, 0%, 0%, 0.4);
  --grey600: hsla(0deg, 0%, 0%, 0.6);

  --contentBeforeLeft: ${(p) => (p.isChecked ? '-100%' : '0%')};
  --contentAfterLeft: ${(p) => (p.isChecked ? '0%' : '100%')};

  --toggleBackground: ${(p) => (p.isChecked ? 'var(--green)' : 'var(--grey)')};
  --toggleActiveContentTransform: ${(p) => (p.isChecked ? 'translateX(8px)' : 'translateX(-8px)')};

  position: relative;
  border-radius: var(--radius);

  border: none;
  margin: 8px 0;
`;

const Content = styled.span`
  position: relative;
  font-family: Arial;
  text-align: center;

  height: var(--height);
  width: var(--width);
  line-height: var(--height);
  font-size: var(--fontSize);

  &::before {
    content: 'OFF';
    width: var(--width);
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: var(--contentBeforeLeft);
    transition: 0.2s left ease;
  }

  &::after {
    content: 'ON';
    width: var(--width);
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: var(--contentAfterLeft);
    transition: 0.2s left ease;
  }
  transition: 0.2s all ease;
`;

const ToggleLabel = styled.label`
  display: grid;
  place-items: center;
  box-shadow: 0 0 0 1px black;

  width: var(--width);
  height: var(--height);
  border-radius: var(--radius);

  background: var(--toggleBackground);
  color: var(--white);
  text-shadow: -2px 1px 1px var(--grey400);
  font-weight: var(--weight);

  overflow: hidden;
  cursor: pointer;
  user-select: none;

  &:active {
    ${Content} {
      transform: var(--toggleActiveContentTransform);
    }
  }

  transition: all 0.2s ease;
`;

const VisuallyHidden = styled.span`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`;

const Checkbox = styled.input.attrs({
  type: 'checkbox',
})`
  visibility: hidden;
`;
