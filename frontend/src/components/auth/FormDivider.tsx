import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Divider = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  gap: 2rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  & div {
    flex-grow: 1;
    flex-shrink: 1;
    height: 1px;
    background-color: var(--color-gray-700);
  }

  & span {
    text-transform: uppercase;
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--text-color-gray);
  }
`;

const FormDivider = ({ children }: PropsWithChildren) => {
  return (
    <Divider>
      <div></div>
      <span>{children}</span>
      <div></div>
    </Divider>
  );
};

export default FormDivider;
