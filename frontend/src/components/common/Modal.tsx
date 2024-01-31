import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';

const ModalStyled = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
  transition: all 0.5s;
  overflow: hidden;
  z-index: 100;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 99;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 1rem;
  transform: translateX(0.8rem);
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;
  cursor: pointer;
  z-index: 100;

  &:hover svg {
    transform: scale(1.1);
  }

  &:active svg {
    transform: scale(0.95);
  }

  & svg {
    width: 2.6rem;
    height: 2.6rem;
    color: #fff;
  }
`;

type ModalProps = {
  onCloseModal: () => void;
};

function Modal({ onCloseModal, children }: PropsWithChildren<ModalProps>) {
  return createPortal(
    <>
      <Overlay onClick={onCloseModal} />
      <Button onClick={onCloseModal}>
        <IoClose />
      </Button>
      <ModalStyled>{children}</ModalStyled>
    </>,
    document.body
  );
}

export default Modal;
