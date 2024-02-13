import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import NavBar from './NavBar';

const AppLayoutStyled = styled.div`
  display: grid;
  grid-template-columns: 28rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  overflow-y: scroll;
  grid-column: 2 / -1;
  grid-row: 2/ -1;
`;

function AppLayout() {
  return (
    <AppLayoutStyled>
      <NavBar />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </AppLayoutStyled>
  );
}

export default AppLayout;
