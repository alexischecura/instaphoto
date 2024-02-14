import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import Navbar from './Navbar';

const AppLayoutStyled = styled.div`
  display: grid;
  grid-template-columns: 28rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  @media (max-width: 1250px) {
    grid-template-columns: 11rem 1fr;
  }
  @media (max-width: 800px) {
    grid-template-columns: 8rem 1fr;
  }
`;

const Main = styled.main`
  overflow-y: scroll;
  grid-column: 2 / -1;
  grid-row: 2/ -1;
`;

function AppLayout() {
  return (
    <AppLayoutStyled>
      <Navbar />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </AppLayoutStyled>
  );
}

export default AppLayout;
