import { useAuthStore } from '../../hooks/useAuthStore';
import UserIcon from '../common/UserIcon';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavLinkStyled = styled(NavLink)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 2.4rem 0;

  &,
  &:active,
  &:link {
    font-family: inherit;
    color: inherit;
    text-decoration: none;
    font-size: 1.4rem;
    transition: font-weight 0.3s ease;
  }

  &:hover,
  &.active {
    font-weight: 600;
  }

  &.active img {
    outline: 2px solid #000;
  }
`;

function UserSidebarCard() {
  const {
    user: { username, fullName, profilePhoto },
  } = useAuthStore();
  return (
    <NavLinkStyled to={username}>
      <UserIcon profilePhoto={profilePhoto} username={username} size="md" />
      <span>{fullName}</span>
    </NavLinkStyled>
  );
}

export default UserSidebarCard;
