import { Provider } from 'react-redux';
import store from './redux/store';
import AppContainer from './components/AppContainer';
import Nav from './components/Nav';

function App() {
  return (
    <Provider store={store}>
      <Nav></Nav>
      <AppContainer />
    </Provider>
  );
}

export default App;
