import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaHouse,
  FaMagnifyingGlass,
  FaRegCompass,
  FaRegPaperPlane,
  FaRegHeart,
  FaRegSquarePlus,
} from 'react-icons/fa6';

import { useAppSelector } from '../../hooks/useAuthStore';
import UserIcon from '../common/UserIcon';

const MainNavStyled = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  list-style: none;
  text-decoration: none;
`;

const NavLinkStyled = styled(NavLink)`
  &:link,
  &:visited {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1.2rem;

    color: inherit;
    font-size: 1.5rem;
    font-weight: 400;
    transition: all 0.3s;
    border-radius: 0.8rem;
  }

  &:hover {
    background-color: var(--color-gray-300);
  }
  &:active,
  &.active:link,
  &.active:visited {
    font-weight: 600;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg,
  &:hover img,
  &:active img,
  &.active:link img,
  &.active:visited img {
    transform: scale(1.05);
  }
`;

function MainNav() {
  const { username, profilePhoto } = useAppSelector((state) => state.auth.user);

  return (
    <MainNavStyled>
      <li>
        <NavLinkStyled to="/home">
          <FaHouse />
          <span>Home</span>
        </NavLinkStyled>
      </li>
      <li>
        <NavLinkStyled to="/search">
          <FaMagnifyingGlass />
          <span>Search</span>
        </NavLinkStyled>
      </li>
      <li>
        <NavLinkStyled to="/explore">
          <FaRegCompass />
          <span>Explore</span>
        </NavLinkStyled>
      </li>
      <li>
        <NavLinkStyled to="/inbox">
          <FaRegPaperPlane />
          <span>Messages</span>
        </NavLinkStyled>
      </li>
      <li>
        <NavLinkStyled to="/notifications">
          <FaRegHeart />
          <span>Notifications</span>
        </NavLinkStyled>
      </li>
      <li>
        <NavLinkStyled to="/create">
          <FaRegSquarePlus />
          <span>Create</span>
        </NavLinkStyled>
      </li>
      <li>
        <NavLinkStyled to={username}>
          <UserIcon profilePhoto={profilePhoto} username={username} />
          <span>Profile</span>
        </NavLinkStyled>
      </li>
    </MainNavStyled>
  );
}

export default MainNav;
