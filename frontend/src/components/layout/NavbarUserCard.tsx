import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { IoChevronDown, IoNotificationsOutline } from 'react-icons/io5';
import UserIcon from '../common/UserIcon';

import Modal from '../common/Modal';
import MenuCard from '../common/MenuCard';

import { useAuthStore } from '../../hooks/useAuthStore';

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

const NotificationButton = styled.button`
  margin-right: 2rem;
`;

function UserNavCard() {
  const {
    user: { username, profilePhoto },
    startLogOut,
  } = useAuthStore();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const onCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <UserNavCardStyled>
        <NotificationButton>
          <IoNotificationsOutline />
        </NotificationButton>
        <NavLink to={username}>
          <UserIcon size="sm" username={username} profilePhoto={profilePhoto} />
        </NavLink>
        <button onClick={() => setIsModalOpen(true)}>
          <IoChevronDown />
        </button>
      </UserNavCardStyled>
      {isModalOpen && (
        <Modal onCloseModal={onCloseModal}>
          <MenuCard title={'Are you sure to log out?'}>
            <MenuCard.Button onClick={startLogOut} danger>
              Confirm
            </MenuCard.Button>
            <MenuCard.Button onClick={onCloseModal}>Cancel</MenuCard.Button>
          </MenuCard>
        </Modal>
      )}
    </>
  );
}

export default UserNavCard;
