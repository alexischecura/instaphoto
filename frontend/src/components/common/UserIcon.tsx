import styled from 'styled-components';
import { getEnvVariables } from '../../helpers/getEnvVariables';

const { VITE_USER_IMAGE_URL } = getEnvVariables();

type UserIconProps = {
  profilePhoto: string;
  username: string;
  size: 'sm' | 'md' | 'lg';
};

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const UserIconSizes = {
  sm: '36px',
  md: '64px',
  lg: '96px',
};

function UserIcon({ profilePhoto, username, size }: UserIconProps) {
  return (
    <ProfilePicture
      style={{ height: UserIconSizes[size], width: UserIconSizes[size] }}
      className="profile"
      src={`${VITE_USER_IMAGE_URL}/${profilePhoto}`}
      alt={`${username} profile picture`}
    />
  );
}

export default UserIcon;
