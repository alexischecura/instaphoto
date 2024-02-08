import styled from 'styled-components';
import { useAuthStore } from '../../hooks/useAuthStore';

const ConfirmCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 18rem;
  width: 40rem;
  & h4 {
    font-size: 1.6rem;
    font-weight: 600;
    margin: 2rem 0;
  }

  & button {
    cursor: pointer;
    font-family: inherit;
    font-size: 1.4rem;
    font-weight: 600;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: none;
    border-top: 1px solid var(--color-gray-700);
  }

  & button:hover {
    background-color: var(--color-gray-300);
  }

  & .red {
    color: var(--color-red-900);
  }
`;

type ConfirmCartProps = {
  onConfirm: () => void;
  onCloseModal: () => void;
};

function ConfirmCard({ onConfirm, onCloseModal }: ConfirmCartProps) {
  return (
    <ConfirmCardStyled>
      <h4>Are you sure to logout?</h4>
      <button className="red" onClick={onConfirm}>
        Logout
      </button>
      <button onClick={onCloseModal}>Cancel</button>
    </ConfirmCardStyled>
  );
}

export default ConfirmCard;
