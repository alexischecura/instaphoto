import styled from 'styled-components';
import UserCard from '../common/UserCard';
import { useAppSelector } from '../../hooks/useAuthStore';

const FollowingSectionStyled = styled.aside`
  grid-column: 3 / 4;
  grid-row: 1/ -1;
  margin-top: 2.8rem;
`;
const Heading = styled.h4`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-color-gray);
  padding: 0 1.6rem;
  margin-bottom: 0.8rem;
`;
const SuggestedFollowers = styled.div`
  margin-top: 1.6rem;
`;

function FollowingSection() {
  const { fullName, username, profilePhoto } = useAppSelector(
    (state) => state.auth.user
  );

  return (
    <FollowingSectionStyled>
      <UserCard
        buttonLabel="Switch"
        caption={fullName}
        username={username}
        profilePicture={profilePhoto}
      />
      <SuggestedFollowers>
        <Heading>Suggested for you</Heading>
        <UserCard
          buttonLabel="Follow"
          caption="Roberto Carlos"
          username="robertocarlos"
          profilePicture="./robertocarlos.webp"
        />
        <UserCard
          buttonLabel="Follow"
          caption="Cristiano Ronaldo"
          username="ronaldo"
          profilePicture="./ronaldo.jpg"
        />
        <UserCard
          buttonLabel="Follow"
          caption="Leonel Messi"
          username="messi"
          profilePicture="./messi.jpeg"
        />
        <UserCard
          buttonLabel="Follow"
          caption="Zinedine Zidane"
          username="zidane"
          profilePicture="./zidane.jpg"
        />
        <UserCard
          buttonLabel="Follow"
          caption="Ronaldinho Gaúcho"
          username="ronaldinho"
          profilePicture="./ronaldinho.avif"
        />
      </SuggestedFollowers>
    </FollowingSectionStyled>
  );
}

export default FollowingSection;
