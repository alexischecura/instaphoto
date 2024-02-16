import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { IoChevronDown, IoNotificationsOutline } from 'react-icons/io5';
import UserIcon from '../common/UserIcon';

import Modal from '../common/Modal';
import MenuCard from '../common/MenuCard';

import { useAuthStore } from '../../hooks/useAuthStore';
import Notifications from './Notifications';

const UserNavCardStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32rem;
  padding: 0 2.4rem;

  & button {
    border: none;
    background: none;
    display: flex;
    align-items: center;

    cursor: pointer;

    & svg {
      height: 2.4rem;
      width: 2.4rem;
    }
  }
  @media (max-width: 1050px) {
    width: auto;
  }
`;

const NotificationsContainer = styled.div`
  position: relative;

  @media (max-width: 500px) {
    position: static;
  }
`;

const NotificationButton = styled.button`
  margin-right: 2rem;
`;

function UserNavCard() {
  const {
    user: { username, profilePhoto },
    startLogOut,
  } = useAuthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((isModalOpen) => !isModalOpen);

  const toggleNotifications = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsNotificationOpen((isNotificationOpen) => !isNotificationOpen);
  };

  const closeNotifications = () => {
    setIsNotificationOpen(false);
  };

  return (
    <>
      <UserNavCardStyled>
        <NotificationsContainer>
          <NotificationButton onClick={toggleNotifications}>
            <IoNotificationsOutline />
          </NotificationButton>
          {isNotificationOpen && <Notifications onClose={closeNotifications} />}
        </NotificationsContainer>
        <NavLink to={username}>
          <UserIcon size="sm" username={username} profilePhoto={profilePhoto} />
        </NavLink>
        <button onClick={toggleModal}>
          <IoChevronDown />
        </button>
      </UserNavCardStyled>
      {isModalOpen && (
        <Modal onCloseModal={toggleModal}>
          <MenuCard title={'Are you sure to log out?'}>
            <MenuCard.Button onClick={startLogOut} danger>
              Confirm
            </MenuCard.Button>
            <MenuCard.Button onClick={toggleModal}>Cancel</MenuCard.Button>
          </MenuCard>
        </Modal>
      )}
    </>
  );
}

export default UserNavCard;
