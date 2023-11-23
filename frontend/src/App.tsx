import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import GlobalStyle from './styles/GlobalStyle';
import InstagramRouter from './router/InstagramRouter';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <BrowserRouter>
        <InstagramRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
