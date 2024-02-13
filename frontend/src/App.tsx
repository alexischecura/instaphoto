import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import GlobalStyle from './styles/GlobalStyle';
import InstaphotoRouter from './router/InstaphotoRouter';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <BrowserRouter>
        <InstaphotoRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
