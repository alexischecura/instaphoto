import styled from 'styled-components';
import Logo from '../common/Logo';
import MainNav from './MainNav';
import { Link } from 'react-router-dom';

const SidebarStyled = styled.aside`
  padding: 1.5rem 1.2rem;
  height: 100vh;
  border-right: 1px solid var(--color-gray-700);

  grid-row: 1/ -1;
  grid-column: 1 / 2;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const LogoContainer = styled(Link)`
  padding: 2.5rem 1.2rem;
  &,
  &:visited,
  &:link {
    color: inherit;
  }
`;

function Sidebar() {
  return (
    <SidebarStyled>
      <LogoContainer to="/">
        <Logo variation="small" />
      </LogoContainer>
      <MainNav />
    </SidebarStyled>
  );
}

export default Sidebar;
