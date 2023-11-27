import styled from 'styled-components';
import Spinner from '../common/Spinner';

type AuthButtonProps = {
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
};

const AuthButtonStyled = styled.button`
  font-family: inherit;
  font-weight: 500;
  width: 100%;
  height: 3.2rem;
  margin: 0.8rem 0;
  border-radius: 0.8rem;
  border: none;
  background-color: var(--bg-btn-color);
  cursor: pointer;
  color: #fff;

  &:hover {
    background-color: var(--bg-btn-color-hover);
  }

  &:disabled {
    cursor: default;
    background-color: var(--bg-btn-color-disabled);
  }
`;

function AuthButton({ text, isLoading = true, disabled }: AuthButtonProps) {
  return (
    <AuthButtonStyled type="submit" disabled={isLoading || disabled}>
      {isLoading ? <Spinner animationTime={0.5} /> : text}
    </AuthButtonStyled>
  );
}

export default AuthButton;
