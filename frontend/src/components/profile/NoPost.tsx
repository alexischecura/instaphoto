import { IoCameraOutline } from 'react-icons/io5';
import styled from 'styled-components';

const NoPostStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  grid-column: 1 / -1;
  margin-top: 10rem;
`;

const Heading = styled.h2`
  font-size: 3rem;
  font-weight: 800;
`;
const IconContainer = styled.div`
  border: 2px solid var(--color-black-900);
  height: 6rem;
  width: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  & svg {
    width: 3.4rem;
    height: 3.4rem;
  }
`;

function NoPost() {
  return (
    <NoPostStyled>
      <IconContainer>
        <IoCameraOutline />
      </IconContainer>
      <Heading>No Posts Yet</Heading>
    </NoPostStyled>
  );
}

export default NoPost;
