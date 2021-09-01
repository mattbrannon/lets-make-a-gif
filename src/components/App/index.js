import { Router } from '@reach/router';
import HomePage from '../Home';
import Header from '../Header';
import Main from './Main';

const App = () => {
  return (
    <>
      <Header>Let's Make a Gif</Header>
      <Router style={{ height: 'calc(100vh - var(--headerHeight))' }}>
        <HomePage path="/" />
        <Main kind="image" path="image" />
        <Main kind="video" path="video" />
      </Router>
    </>
  );
};

export default App;
