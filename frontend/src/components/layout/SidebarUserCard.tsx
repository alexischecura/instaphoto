import { useAuthStore } from '../../hooks/useAuthStore';
import UserIcon from '../common/UserIcon';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const SidebarUserCardStyled = styled(NavLink)`
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

  & span {
    transition: font-weight 0.3s ease;
    line-height: 80%;
  }

  &:hover .username,
  &.active .username {
    font-weight: 600;
  }

  &.active img {
    outline: 2px solid #000;
  }
  & .fullname {
    color: var(--text-color-gray);
    font-weight: 500;
  }

  @media (max-width: 1250px) {
    & span {
      display: none;
    }
  }
  @media (max-width: 700px) {
    padding: 0;
    & span {
      display: none;
    }
  }
`;

function SidebarUserCard() {
  const {
    user: { username, fullName, profilePhoto },
  } = useAuthStore();
  return (
    <SidebarUserCardStyled to={username}>
      <UserIcon profilePhoto={profilePhoto} username={username} size="md" />
      <span className="username">{username}</span>
      <span className="fullname">{fullName}</span>
    </SidebarUserCardStyled>
  );
}

export default SidebarUserCard;
