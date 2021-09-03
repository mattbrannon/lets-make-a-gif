import { Router } from '@reach/router';
import Header from '../Header';
import Main from './Main';
import NotFoundPage from '../404';

const App = () => {
  return (
    <>
      <Header>Let's Make a Gif</Header>
      <Router style={{ height: 'calc(100vh - var(--headerHeight))' }}>
        <Main path="/" />
        <NotFoundPage default />
      </Router>
    </>
  );
};

export default App;
