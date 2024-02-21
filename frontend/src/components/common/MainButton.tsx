import styled from 'styled-components';
import Spinner from './Spinner';

type MainButtonProps = {
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
  type: 'submit' | 'button';
  onClick?: () => void;
  color?: 'gray';
};

const MainButtonStyled = styled.button<{ color?: 'gray' }>`
  font-family: inherit;
  font-weight: 500;
  width: 100%;
  height: 3.2rem;
  margin: 0.8rem 0;
  border-radius: 0.8rem;
  border: ${({ color }) =>
    color === 'gray' ? '1px solid var(--color-gray-900)' : 'none'};
  background-color: ${({ color }) =>
    color === 'gray' ? 'var(--color-gray-0)' : 'var(--btn-color)'};
  cursor: pointer;
  color: ${({ color }) => (color === 'gray' ? '#111' : '#fff')};
  padding: 0 1.6rem;

  &:hover {
    background-color: ${({ color }) =>
      color === 'gray' ? 'var(--color-gray-300)' : 'var(--btn-color-hover)'};
  }

  &:disabled {
    cursor: default;
    background-color: ${({ color }) =>
      color === 'gray' ? 'var(--color-gray-700)' : 'var(--btn-color-disabled)'};
  }
`;

function MainButton({
  text,
  isLoading = false,
  disabled = false,
  type = 'button',
  onClick,
  color,
}: MainButtonProps) {
  return (
    <MainButtonStyled
      type={type}
      disabled={isLoading || disabled}
      onClick={onClick}
      color={color}
    >
      {isLoading ? <Spinner animationTime={0.5} /> : text}
    </MainButtonStyled>
  );
}

export default MainButton;
