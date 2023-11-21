import { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import GlobalStyle from './styles/GlobalStyle';

const LoginPage = lazy(() => import('./pages/LoginPage'));

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <BrowserRouter>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<h1>Hi there</h1>}></Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
