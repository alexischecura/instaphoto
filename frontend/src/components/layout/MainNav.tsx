import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
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
import { useState } from 'react';
import Modal from '../common/Modal';
import CreatePost from '../posts/CreatePost';

const MainNavStyled = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  list-style: none;
  text-decoration: none;
`;

const navButtonCommonStyles = css`
  &,
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
    background: none;
    width: 100%;
  }

  &:hover {
    background-color: var(--color-gray-300);
  }

  &.active:link,
  &.active:visited {
    font-weight: 600;
  }
  &:active .profile,
  &.active:link .profile,
  &.active:visited .profile {
    border: 2px solid #000;
  }

  & svg,
  & .profile {
    width: 2.6rem;
    height: 2.6rem;
    transition: transform 0.3s;
  }

  &:hover svg,
  &:hover .profile {
    transform: scale(1.1);
  }

  &:active svg,
  &:active .profile {
    transform: scale(0.9);
  }
  &.active .sharp,
  & .outline {
    display: inline;
  }
  &.active .outline,
  & .sharp {
    display: none;
  }
`;

const NavLinkStyled = styled(NavLink)`
  ${navButtonCommonStyles}
`;

const NavButtonStyled = styled.button`
  ${navButtonCommonStyles}
  border: none;
  cursor: pointer;
`;

type ButtonActive = '' | 'CREATE' | 'SEARCH';

function MainNav() {
  const {
    user: { username, profilePhoto },
  } = useAuthStore();

  const [buttonActive, setButtonActive] = useState<ButtonActive>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCreateButton = () => {
    setButtonActive('CREATE');
    setIsModalOpen(true);
  };
  const handleSearchButton = () => {
    setButtonActive('SEARCH');
  };

  const clearButtonActive = () => {
    setButtonActive('');
    setIsModalOpen(false);
  };

  return (
    <>
      <MainNavStyled>
        <li>
          <NavLinkStyled to="/" onClick={clearButtonActive}>
            <IoHomeSharp className="sharp" />
            <IoHomeOutline className="outline" />
            <span>Home</span>
          </NavLinkStyled>
        </li>
        <li>
          <NavButtonStyled
            onClick={handleSearchButton}
            className={buttonActive === 'SEARCH' ? 'active' : ''}
          >
            <IoSearchOutline className="outline" />
            <IoSearchSharp className="sharp" />
            <span>Search</span>
          </NavButtonStyled>
        </li>
        <li>
          <NavLinkStyled to="/explore" onClick={clearButtonActive}>
            <IoCompassOutline className="outline" />
            <IoCompassSharp className="sharp" />
            <span>Explore</span>
          </NavLinkStyled>
        </li>
        <li>
          <NavLinkStyled to="/messages" onClick={clearButtonActive}>
            <IoPaperPlaneOutline className="outline" />
            <IoPaperPlaneSharp className="sharp" />
            <span>Messages</span>
          </NavLinkStyled>
        </li>
        <li>
          <NavLinkStyled to="/notifications" onClick={clearButtonActive}>
            <IoHeartOutline className="outline" />
            <IoHeartSharp className="sharp" />
            <span>Notifications</span>
          </NavLinkStyled>
        </li>
        <li>
          <NavButtonStyled
            onClick={handleCreateButton}
            className={buttonActive === 'CREATE' ? 'active' : ''}
          >
            <IoAddCircleOutline className="outline" />
            <IoAddCircleSharp className="sharp" />
            <span>Create</span>
          </NavButtonStyled>
        </li>
        <li>
          <NavLinkStyled to={username}>
            <UserIcon profilePhoto={profilePhoto} username={username} />
            <span>Profile</span>
          </NavLinkStyled>
        </li>
      </MainNavStyled>
      {isModalOpen && (
        <Modal onCloseModal={clearButtonActive}>
          <CreatePost onCloseModal={clearButtonActive} />
        </Modal>
      )}
    </>
  );
}

export default MainNav;
