import styled from 'styled-components';
import { useFollowStore } from '../../hooks/useFollowStore';
import UserRecommended from './UserRecommended';

const RecommendedUsersStyled = styled.ul`
margin-bottom: 8rem;
  width: 80%;
  display: flex;
  justify-content: space-around;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const Message = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
  padding: 2.4rem 0;
  margin-bottom: 2rem;
`;

function RecommendedUsers() {
  const { suggestedProfiles, toggleFollow, isLoadingUserId } = useFollowStore();

  const users = suggestedProfiles.slice(1, 4);

  return (
    <>
      <Message>Recommended profiles</Message>
      <RecommendedUsersStyled>
        {users.map((user) => (
          <UserRecommended
            key={user.id}
            user={user}
            isLoadingUserId={isLoadingUserId}
            toggleFollow={toggleFollow}
          />
        ))}
      </RecommendedUsersStyled>
    </>
  );
}

export default RecommendedUsers;
