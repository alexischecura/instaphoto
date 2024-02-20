import styled from 'styled-components';
import UserIcon from '../common/UserIcon';
import MainButton from '../common/MainButton';
import { SimpleProfile } from '../../types/user';

const UserCard = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  width: 15rem;

  @media (max-width: 1300px) {
    width: 13rem;
  }
  @media (max-width: 600px) {
    width: 18rem;
  }
`;

const Username = styled.h4`
  font-size: 1.4rem;
  font-weight: 600;
`;
const FullName = styled.span`
  color: var(--color-gray-900);
  font-size: 1.4rem;
`;
type UserRecommendedProps = {
  user: SimpleProfile;
  isLoadingUserId: string;
  toggleFollow: (id: string, isFollowing?: boolean) => Promise<void>;
};

function UserRecommended({
  user,
  isLoadingUserId,
  toggleFollow,
}: UserRecommendedProps) {
  const { profilePhoto, username, fullName, id, isFollowing } = user;
  const isLoading = isLoadingUserId === id;

  return (
    <UserCard key={user.id}>
      <UserIcon size="lg" profilePhoto={profilePhoto} username={username} />
      <Username>{username}</Username>
      <FullName>{fullName}</FullName>
      <MainButton
        text={isFollowing ? 'Unfollow' : 'Follow'}
        type="button"
        onClick={() => toggleFollow(id, isFollowing)}
        isLoading={isLoading}
        disabled={isLoading}
      />
    </UserCard>
  );
}

export default UserRecommended;
