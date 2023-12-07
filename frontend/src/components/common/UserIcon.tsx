import styled from 'styled-components';

type UserIconProps = {
  profilePhoto: string;
  username: string;
};

const ProfileImg = styled.img`
  border-radius: 99rem;
  height: 2.6rem;
  width: 2.6rem;
`;

function UserIcon({ profilePhoto, username }: UserIconProps) {
  return (
    <>
      <ProfileImg
        src={`profile-pictures/${
          profilePhoto ? profilePhoto : 'default_user.jpg'
        }`}
        alt={`${username} profile picture`}
      />
    </>
  );
}

export default UserIcon;
