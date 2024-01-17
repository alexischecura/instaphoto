import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

import UserCard from '../common/UserCard';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useFollowStore } from '../../hooks/useFollowStore';

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
  const { user } = useAuthStore();
  const { isLoadingSuggestions, suggestedProfiles, toggleFollow } =
    useFollowStore();

  return (
    <FollowingSectionStyled>
      <UserCard
        buttonLabel="Switch"
        caption={user.fullName}
        username={user.username}
        profilePhoto={user.profilePhoto}
      />
      <SuggestedFollowers>
        <Heading>Suggested for you</Heading>
        {isLoadingSuggestions ? (
          <Skeleton
            height="50px"
            width="320px"
            count={5}
            style={{ textAlign: 'center', marginBottom: '10px' }}
          />
        ) : (
          suggestedProfiles.map((profile) => (
            <UserCard
              key={profile.username}
              buttonLabel={profile.isFollowing ? 'Unfollow' : 'Follow'}
              username={profile.username}
              caption={profile.fullName}
              profilePhoto={profile.profilePhoto}
              onClick={() => toggleFollow(profile.id, profile.isFollowing)}
              isLoading={profile.isLoading}
            />
          ))
        )}
      </SuggestedFollowers>
    </FollowingSectionStyled>
  );
}

export default FollowingSection;
