import styled from 'styled-components';
import { Profile } from '../../types/user';

const Header = styled.header`
  margin-top: 3rem;
  display: flex;
  margin-bottom: 2rem;
`;

const ProfilePictureContainer = styled.div`
  width: 45rem;
  display: flex;
  justify-content: center;
`;

const ProfilePicture = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  object-fit: cover;
`;

const HeaderInfo = styled.header`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
  padding: 1rem 2rem;
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
      <ProfilePictureContainer>
        <ProfilePicture
          src={`/profile-pictures/${
            profilePhoto ? profilePhoto : 'default_user.jpg'
          }`}
        />
      </ProfilePictureContainer>
      <HeaderInfo>
        <HeadingSecondary>{username}</HeadingSecondary>
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
        <HeadingTertiary>{fullName}</HeadingTertiary>
        <Description>{description}</Description>
      </HeaderInfo>
    </Header>
  );
}

export default HeaderProfile;
