import styled from 'styled-components/macro';

const NotFoundPage = () => {
  return (
    <Wrapper>
      <h1>Whoops! Nothing here...</h1>
    </Wrapper>
  );
};

export default NotFoundPage;


const Wrapper = styled.div`
  height: var(--mainHeight);
  display: grid;
  place-items: center;
  font-family: Optima;


`