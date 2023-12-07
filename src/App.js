import './App.scss';
import ThumbCreator from './components/ThumbCreator';
import ThumbStorage from './components/ThumbStorage';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ThumbCreator />
        <ThumbStorage />
      </div>
    </Provider>
  );
}

export default App;
