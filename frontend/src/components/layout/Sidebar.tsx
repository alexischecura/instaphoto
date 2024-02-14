import styled from 'styled-components';
import Logo from '../common/Logo';
import MainNav from './SidebarNav';
import { Link } from 'react-router-dom';

import { RiPolaroidLine } from 'react-icons/ri';

const SidebarStyled = styled.aside`
  padding: 1.5rem 1.2rem;
  height: 100vh;
  border-right: 1px solid var(--color-gray-700);
  grid-row: 1/ -1;
  grid-column: 1 / 2;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media (max-width: 700px) {
    grid-row: 3/ -1;
    grid-column: 1 / -1;
    height: auto;
    border-right: none;
    border-top: 1px solid var(--color-gray-700);
  }
`;

const LogoContainer = styled(Link)`
  padding: 2.5rem 0;

  display: flex;
  align-items: center;
  justify-content: center;

  &,
  &:visited,
  &:link {
    color: inherit;
  }

  & .icon {
    height: 3.6rem;
    width: 3.6rem;
    display: none;
  }

  @media (max-width: 1250px) {
    & .logo {
      display: none;
    }
    & .icon {
      display: inline-block;
    }
  }

  @media (max-width: 700px) {
    position: absolute;
    top: 1.4rem;
    left: 0;
    padding: 0 2rem;
  }
`;

function Sidebar() {
  return (
    <SidebarStyled>
      <LogoContainer to="/">
        <Logo variation="small" />
        <RiPolaroidLine className="icon" />
      </LogoContainer>
      <MainNav />
    </SidebarStyled>
  );
}

export default Sidebar;
