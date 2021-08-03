import styled from 'styled-components/macro';
export default function FiltersPanel({ filters, filterMethods }) {
  const { colorFilter, flipFilter, fpsFilter } = filters;
  const { setColorFilter, setEmbossFilter, setFlipFilter, setFpsFilter } = filterMethods;
  return (
    <Container>
      {/* <Offset>
        <Legend>Size</Legend>
        <Group>
          <Label htmlFor="fps">
            <span>Framerate</span>
            <Input
              type="number"
              min="4"
              max="120"
              value={fpsFilter || undefined}
              name="fps"
              onChange={(e) => setFpsFilter(e.target.value)}
            />
          </Label>
        </Group>
      </Offset> */}
      <Fieldset>
        <Legend>Filters</Legend>
        <Group>
          <Label htmlFor="hue">
            <span>Hue</span>
            <Input
              id="hue"
              type="number"
              min="-1"
              max="360"
              value={keepHueInRange(colorFilter.h)}
              name="hue"
              onChange={(e) => setColorFilter({ ...colorFilter, h: e.target.value })}
            />
          </Label>
          <Label htmlFor="saturation">
            <span>Saturation</span>
            <Input
              id="saturation"
              type="number"
              min="-10"
              max="10"
              name="saturation"
              value={colorFilter.s}
              onChange={(e) => setColorFilter({ ...colorFilter, s: e.target.value })}
            />
          </Label>
          <Label htmlFor="brightness">
            <span>Brightness</span>
            <Input
              id="brightness"
              type="number"
              min="-10"
              max="10"
              name="brightness"
              value={colorFilter.b}
              onChange={(e) => setColorFilter({ ...colorFilter, b: e.target.value })}
            />
          </Label>
        </Group>
        <Group>
          <Cell onChange={(e) => setEmbossFilter(e.target.checked)} type="checkbox" name="emboss" />
          <Cell onChange={(e) => setFlipFilter({ ...flipFilter, hflip: e.target.checked })} type="checkbox" name="hflip" />
          <Cell onChange={(e) => setFlipFilter({ ...flipFilter, vflip: e.target.checked })} type="checkbox" name="vlip" />
        </Group>
        {/* <FilterRow onChange={handleFilterChange}/> */}
      </Fieldset>
    </Container>
  );
}

const Cell = ({ type, name, onChange }) => {
  const labelText = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <Label htmlFor={name}>
      <span>{labelText}</span>
      <Input name={name} id={name} type={type} onChange={onChange} />
    </Label>
  );
};

// function FilterRow({ ...props }) {
//   return (
//     <Group>
//       <Cell {...props} type="checkbox" name="emboss" />
//       <Cell {...props} type="checkbox" name="hflip" />
//       <Cell {...props} type="checkbox" name="vlip" />
//     </Group>
//   );
// }

const Container = styled.div`
  // min-height: 100%;
  max-width: 60ch;
  width: 100%;
  margin: 24px auto;
`;

const Fieldset = styled.fieldset`
  margin: 32px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 1px 2px black;
  background: repeating-linear-gradient(
      45deg,
      #33333380 17%,
      transparent 17%,
      transparent 35%,
      #45a45a80 35%
    ),
    repeating-linear-gradient(
      180deg,
      #00000080 0%,
      #00000080 15%,
      #48a48a80 15%,
      #48a48a80 40%,
      white 40%,
      white 42%,
      black 42%,
      black 44%,
      white 45%,
      black 46%,
      white 47%,
      black 48%,
      white 49%,
      black 50%
    ),
    repeating-linear-gradient(-45deg, #893893 17%, #45a 35%);
`;

const Offset = styled(Fieldset)`
  background: grey;
  width: fit-content;
  padding: 0 16px;
`;

const Legend = styled.legend`
  margin: 0 auto;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0 16px;
  transform: translateY(-16px);
`;

const Input = styled.input`
  padding: 0px 4px;
  font-size: 1.1rem;
  border-radius: 4px;

  background: ${(p) => p.type === 'number' && '#eee'};
`;

const Label = styled.label`
  display: grid;
  align-content: center;
  align-items: center;
  grid-auto-flow: column;
  justify-content: center;
  gap: 16px;
  font-weight: 500;
`;

const Group = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 16px 0;
`;

const keepHueInRange = (hue) => {
  hue = Number(hue);
  while (hue >= 360 || hue < 0) {
    hue = hue >= 360 ? hue - 360 : hue < 0 ? hue + 360 : hue;
  }
  return hue;
};









/**
 *   // useEffect(() => {
  //   if (options.color.hue.h) {
  //     const {
  //       color: {
  //         hue: { h },
  //       },
  //     } = options

  //     const value = keepHueInRange(h);
  //     const hue = options.color.hue;
  //     const color = options.color;

  //     setOptions({
  //       ...options,
  //       ...color,
  //       hue: {
  //         ...hue,
  //         h: value
  //       },
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [options.color.hue.h]);

  // const handleFilterChange = (e) => {
  //   if (e.target.type === 'checkbox') {
  //     setOptions({ ...options, [e.target.name]: e.target.checked });
  //   }
  //   if (e.target.type === 'number') {
  //     const group = ['hue', 'saturation', 'brightness'];
  //     const name = e.target.name;
  //     if (group.includes(name)) {
  //       const key = name.charAt(0).toLowerCase();
  //       const value = e.target.value;
  //       const colors = options.color.hue;
  //       setOptions({
  //         ...options,
  //         color: {
  //           hue: {
  //             ...colors,
  //             [key]: Number(value),
  //           },
  //         },
  //       });
  //       // const { h, s, b } = options.hue;
  //       // console.log({key, h, s, b})
  //       // setOptions({...options, {...hue}})
  //     } else {
  //       setOptions({ ...options, [e.target.name]: Number(e.target.value) });
  //     }
  //   }
  // };

 */