import styled from 'styled-components';

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
    cursor: text;
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
    cursor: text;
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

type InputFormProps = {
  type: 'password' | 'text' | 'tel' | 'email';
  field: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  disable?: boolean;
  required?: boolean;
  showBtn?: boolean;
  btnLabel?: string;
  onClickBtn?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function InputForm({
  type,
  field,
  placeholder,
  value,
  disable = false,
  required = false,
  autoComplete = '',
  onChange,
  showBtn = false,
  btnLabel,
  onClickBtn,
}: InputFormProps) {
  return (
    <FieldHolderStyled>
      <input
        type={type}
        id={field}
        name={field}
        value={value}
        disabled={disable}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
      />
      <label htmlFor={field}>{placeholder}</label>
      {showBtn && (
        <button type="button" onClick={onClickBtn}>
          {btnLabel}
        </button>
      )}
    </FieldHolderStyled>
  );
}

export default InputForm;
