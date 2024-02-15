import styled from 'styled-components';
import { Profile } from '../../types/user';
import { getEnvVariables } from '../../helpers/getEnvVariables';

const { VITE_USER_IMAGE_URL } = getEnvVariables();

const Header = styled.header`
  margin: 3rem auto;
  gap: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 550px) {
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 0;
  }
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ProfilePicture = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  object-fit: cover;
`;

const HeaderInfo = styled.header`
  min-height: 15rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
  padding: 1rem 2rem;

  @media (max-width: 550px) {
    min-height: auto;
  }
`;

const HeadingSecondary = styled.h2`
  font-size: 2rem;
  font-weight: 400;
`;
const List = styled.ul`
  list-style: none;
  font-size: 1.6rem;
  display: flex;
  gap: 4rem;

  & li span:first-child {
    font-weight: 600;
  }

  @media (max-width: 550px) {
    justify-content: center;
    font-size: 1.5rem;
  }
`;

const HeadingTertiary = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 1.4rem;
`;

function HeaderProfile({ profile }: { profile: Profile }) {
  const {
    profilePhoto,
    username,
    fullName,
    description,
    _count: quantities,
  } = profile;

  return (
    <Header>
      <UserProfile>
        <ProfilePicture src={`${VITE_USER_IMAGE_URL}/${profilePhoto}`} />
        <HeadingSecondary>{username}</HeadingSecondary>
        <HeadingTertiary>{fullName}</HeadingTertiary>
      </UserProfile>
      <HeaderInfo>
        <List>
          <li>
            <span>{quantities.posts}</span>
            <span> Post</span>
          </li>
          <li>
            <span>{quantities.followers}</span>
            <span> Followers</span>
          </li>
          <li>
            <span>{quantities.followees}</span>
            <span> Following</span>
          </li>
        </List>
        <Description>{description}</Description>
      </HeaderInfo>
    </Header>
  );
}

export default HeaderProfile;
