import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const MenuCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 40rem;
  & h4 {
    font-size: 1.7rem;
    font-weight: 500;
    margin: 2rem 0;
  }
`;

const ButtonStyled = styled.button<{ danger: boolean }>`
  cursor: pointer;
  font-family: inherit;
  font-size: 1.4rem;
  font-weight: 600;
  width: 100%;
  height: 6rem;
  background-color: #fff;
  border: none;
  border-top: 1px solid var(--color-gray-700);

  color: ${({ danger }) => (danger ? 'var(--color-red-900)' : 'inherit')};
  font-weight: ${({ danger }) => (danger ? '600' : '400')};

  &:hover {
    background-color: var(--color-gray-300);
  }
`;

type MenuCardProps = {
  title?: string;
};

function MenuCard({ title, children }: PropsWithChildren<MenuCardProps>) {
  return (
    <MenuCardStyled>
      {title && <h4>{title}</h4>}
      {children}
    </MenuCardStyled>
  );
}

type ButtonProps = {
  onClick: () => void;
  danger?: boolean;
};

function Button({
  onClick,
  danger = false,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <ButtonStyled danger={danger} onClick={onClick}>
      {children}
    </ButtonStyled>
  );
}

MenuCard.Button = Button;

export default MenuCard;
