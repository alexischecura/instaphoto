import styled from 'styled-components';
import HeaderProfile from '../components/profile/HeaderProfile';
import ProfilePosts from '../components/profile/ProfilePosts';
import { useProfileStore } from '../hooks/useProfileStore';
import LoadingCircle from '../components/common/LoadingCircle';

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 93.5rem;
`;
const Divider = styled.div`
  height: 1px;
  width: 100%;
  margin: 2rem 0;
  background-color: var(--color-gray-700);
`;

function ProfilePage() {
  const { profile, isLoadingProfile } = useProfileStore();

  if (isLoadingProfile) return <LoadingCircle />;
  if (profile)
    return (
      <Profile>
        <HeaderProfile profile={profile} />
        <Divider />
        <ProfilePosts posts={profile.posts} />
      </Profile>
    );
}

export default ProfilePage;
