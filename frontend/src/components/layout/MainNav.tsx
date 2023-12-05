import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  IoHomeOutline,
  IoHomeSharp,
  IoSearchOutline,
  IoSearchSharp,
  IoCompassOutline,
  IoCompassSharp,
  IoPaperPlaneOutline,
  IoPaperPlaneSharp,
  IoHeartOutline,
  IoHeartSharp,
  IoAddCircleOutline,
  IoAddCircleSharp,
} from 'react-icons/io5';

import UserIcon from '../common/UserIcon';
import { useAuthStore } from '../../hooks/useAuthStore';

const MainNavStyled = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
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
    font-size: 1.6rem;
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

  &:active img,
  &.active:link img,
  &.active:visited img {
    border: 2px solid #000;
  }

  & svg {
    width: 2.6rem;
    height: 2.6rem;
    transition: all 0.3s;
  }

  &:hover svg,
  &:hover img {
    transform: scale(1.05);
  }

  &.active .sharp {
    display: inline;
  }
  &.active .outline {
    display: none;
  }

  & .sharp {
    display: none;
  }
  & .outline {
    display: inline;
  }
`;

function MainNav() {
  const {
    user: { username, profilePhoto },
  } = useAuthStore();

  return (
    <MainNavStyled>
      <li>
        <NavLinkStyled to="/">
          <IoHomeSharp className="sharp" />
          <IoHomeOutline className="outline" />
          <span>Home</span>
        </NavLinkStyled>
      </li>
      <li>
        <NavLinkStyled to="/search">
          <IoSearchOutline className="outline" />
          <IoSearchSharp className="sharp" />
          <span>Search</span>
        </NavLinkStyled>
      </li>
      <li>
        <NavLinkStyled to="/explore">
          <IoCompassOutline className="outline" />
          <IoCompassSharp className="sharp" />
          <span>Explore</span>
        </NavLinkStyled>
      </li>
      <li>
        <NavLinkStyled to="/inbox">
          <IoPaperPlaneOutline className="outline" />
          <IoPaperPlaneSharp className="sharp" />
          <span>Messages</span>
        </NavLinkStyled>
      </li>
      <li>
        <NavLinkStyled to="/notifications">
          <IoHeartOutline className="outline" />
          <IoHeartSharp className="sharp" />
          <span>Notifications</span>
        </NavLinkStyled>
      </li>
      <li>
        <NavLinkStyled to="/create">
          <IoAddCircleOutline className="outline" />
          <IoAddCircleSharp className="sharp" />
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
