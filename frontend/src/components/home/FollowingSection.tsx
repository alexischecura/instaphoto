import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

import UserCard from '../common/UserCard';
import { useFollowStore } from '../../hooks/useFollowStore';
import { useEffect } from 'react';

const FollowingSectionStyled = styled.aside`
  grid-column: 2 / 3;

  @media (max-width: 1050px) {
    display: none;
  }
`;
const Heading = styled.h4`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-color-gray);
  padding: 0 1.6rem;
  margin-bottom: 0.8rem;
`;
const SuggestedFollowers = styled.div`
  position: sticky;
  top: 3rem;
`;

function FollowingSection() {
  const {
    isLoadingSuggestions,
    suggestedProfiles,
    isLoadingUserId,
    toggleFollow,
    startGettingSuggestingUsers,
  } = useFollowStore();

  useEffect(() => {
    startGettingSuggestingUsers();
  }, []);

  return (
    <FollowingSectionStyled>
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
              isLoading={profile.id === isLoadingUserId}
            />
          ))
        )}
      </SuggestedFollowers>
    </FollowingSectionStyled>
  );
}

export default FollowingSection;
