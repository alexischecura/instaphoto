import { IoChevronDown, IoNotificationsOutline } from 'react-icons/io5';
import styled from 'styled-components';
import UserIcon from '../common/UserIcon';
import { useAuthStore } from '../../hooks/useAuthStore';
import Modal from '../common/Modal';
import ConfirmCard from '../common/ConfirmCard';
import { useState } from 'react';

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
        <UserIcon size="sm" username={username} profilePhoto={profilePhoto} />
        <button onClick={() => setIsModalOpen(true)}>
          <IoChevronDown />
        </button>
      </UserNavCardStyled>
      {isModalOpen && (
        <Modal onCloseModal={() => setIsModalOpen(false)}>
          <ConfirmCard onConfirm={startLogOut} onCloseModal={onCloseModal} />
        </Modal>
      )}
    </>
  );
}

export default UserNavCard;
