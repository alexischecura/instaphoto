import styled from 'styled-components';
import Spinner from './Spinner';

type MainButtonProps = {
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
  type: 'submit' | 'button';
  onClick?: () => void;
};

const MainButtonStyled = styled.button`
  font-family: inherit;
  font-weight: 500;
  width: 100%;
  height: 3.2rem;
  margin: 0.8rem 0;
  border-radius: 0.8rem;
  border: none;
  background-color: var(--btn-color);
  cursor: pointer;
  color: #fff;
  padding: 0 1.6rem;

  &:hover {
    background-color: var(--btn-color-hover);
  }

  &:disabled {
    cursor: default;
    background-color: var(--btn-color-disabled);
  }
`;

function MainButton({
  text,
  isLoading = false,
  disabled = false,
  type = 'button',
  onClick,
}: MainButtonProps) {
  return (
    <MainButtonStyled
      type={type}
      disabled={isLoading || disabled}
      onClick={onClick}
    >
      {isLoading ? <Spinner animationTime={0.5} /> : text}
    </MainButtonStyled>
  );
}

export default MainButton;
