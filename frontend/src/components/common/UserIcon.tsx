import styled from 'styled-components';

type UserIconProps = {
  profilePhoto: string;
  username: string;
};

// 🔴 TODO: add styles to img
const ProfileImg = styled.img`
  border-radius: 99rem;
  height: 2.4rem;
`;

function UserIcon({ profilePhoto, username }: UserIconProps) {
  return (
    <>
      <ProfileImg
        src={profilePhoto ? profilePhoto : './default_user.jpg'}
        alt={`${username} profile picture`}
      />
    </>
  );
}

export default UserIcon;
