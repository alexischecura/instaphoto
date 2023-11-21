import styled from 'styled-components';

type FieldHolderProps = {
  children: React.ReactNode;
};

const FieldHolderStyled = styled.div`
  position: relative;
  margin-bottom: 0.6rem;
  display: flex;
  align-items: center;

  & input {
    font-size: 1.2rem;
    border: 1px solid var(--border-gray-700);
    background-color: var(--input-bg);
    width: 26.8rem;
    padding: 1.2rem 0.8rem;
    border-radius: 3px;
    outline: none;
  }
  & input:focus {
    border: 1px solid var(--border-gray-900);
  }

  & input:valid,
  & input:disabled {
    padding-bottom: 0.4rem;
    padding-top: 2rem;
  }

  & input:valid + label,
  & input:disabled + label {
    transform: translateY(-8px);
    font-size: 1rem;
  }

  & label {
    position: absolute;
    color: var(--text-color-gray);
    font-size: 1.2rem;
    left: 8px;
    transition: 0.3s all;
  }
  & button {
    position: absolute;
    right: 1rem;
    font-family: inherit;
    font-weight: 500;
    font-size: 1.4rem;
    border: none;
    background: none;

    cursor: pointer;
    &:hover {
      color: var(--text-color-gray);
    }
  }
`;

function FieldHolder({ children }: FieldHolderProps) {
  return <FieldHolderStyled>{children}</FieldHolderStyled>;
}

export default FieldHolder;
