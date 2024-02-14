import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import Navbar from './Navbar';

const AppLayoutStyled = styled.div`
  display: grid;
  grid-template-columns: 28rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100dvh;

  @media (max-width: 1250px) {
    grid-template-columns: 11rem 1fr;
  }

  @media (max-width: 800px) {
    grid-template-columns: 8rem 1fr;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    grid-template-rows: 6.4rem 1fr 6.4rem;
  }
`;

const Main = styled.main`
  overflow-y: scroll;
  grid-column: 2 / -1;
  grid-row: 2/ -1;

  @media (max-width: 700px) {
    grid-column: 1 / -1;
    grid-row: 2/ 3;
  }
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
