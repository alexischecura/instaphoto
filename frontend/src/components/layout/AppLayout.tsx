import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import styled from 'styled-components';

const AppLayoutStyled = styled.div`
  display: grid;
  grid-template-columns: 33.6rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  overflow-y: scroll;
  grid-column: 2 / -1;
  grid-row: 1/ -1;
`;

function AppLayout() {
  return (
    <AppLayoutStyled>
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </AppLayoutStyled>
  );
}

export default AppLayout;
