import styled from 'styled-components';
import NavUserCard from './NavbarUserCard';
import SearchBar from './SearchBar';

const NavBarStyled = styled.nav`
  grid-column: 2 / 3;
  display: grid;
  grid-template-columns: 1fr 0.4fr;
  width: 100%;
  border-bottom: 1px solid var(--color-gray-700);
  height: 6.4rem;
  @media (max-width: 1050px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

function NavBar() {
  return (
    <NavBarStyled>
      <SearchBar />
      <NavUserCard />
    </NavBarStyled>
  );
}

export default NavBar;
