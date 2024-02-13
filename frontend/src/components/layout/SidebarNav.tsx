import styled from 'styled-components';
import {
  IoHomeOutline,
  IoHomeSharp,
  IoCompassOutline,
  IoCompassSharp,
  IoPaperPlaneOutline,
  IoPaperPlaneSharp,
  IoAddCircleOutline,
} from 'react-icons/io5';

import UserSidebarCard from './SidebarUserCard';
import { useState } from 'react';
import Modal from '../common/Modal';
import CreatePost from '../posts/CreatePost';
import { SidebarNavLink } from './SidebarNavLink';

const SidebarNavStyled = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  list-style: none;
  text-decoration: none;
`;

const NavButtonStyled = styled.button`
  margin: 0 auto;
  margin-top: 2.4rem;
  padding: 1.2rem 3rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;

  color: var(--color-gray-0);
  font-size: 1.6rem;

  border: none;
  border-radius: 9rem;
  background: rgb(223, 46, 166);
  background: linear-gradient(
    245deg,
    rgba(223, 46, 166, 1) 0%,
    rgba(254, 116, 49, 1) 100%
  );

  & svg {
    height: 2.6rem;
    width: 2.6rem;
  }
`;

function SidebarNav() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen((state) => !state);
  };

  return (
    <>
      <UserSidebarCard />
      <SidebarNavStyled>
        <li>
          <SidebarNavLink to="/">
            <IoHomeSharp className="sharp" />
            <IoHomeOutline className="outline" />
            <span>Home</span>
          </SidebarNavLink>
        </li>
        <li>
          <SidebarNavLink to="/explore">
            <IoCompassOutline className="outline" />
            <IoCompassSharp className="sharp" />
            <span>Explore</span>
          </SidebarNavLink>
        </li>
        <li>
          <SidebarNavLink to="/messages">
            <IoPaperPlaneOutline className="outline" />
            <IoPaperPlaneSharp className="sharp" />
            <span>Messages</span>
          </SidebarNavLink>
        </li>

        <li>
          <NavButtonStyled onClick={toggleModal}>
            <span>Create</span>
            <IoAddCircleOutline className="outline" />
          </NavButtonStyled>
        </li>
      </SidebarNavStyled>
      {isModalOpen && (
        <Modal onCloseModal={toggleModal}>
          <CreatePost />
        </Modal>
      )}
    </>
  );
}

export default SidebarNav;
