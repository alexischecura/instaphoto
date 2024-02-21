import styled from 'styled-components';
import { getEnvVariables } from '../../helpers/getEnvVariables';

const { VITE_USER_IMAGE_URL } = getEnvVariables();

type UserIconProps = {
  profilePhoto: string;
  username: string;
  size: 'sm' | 'md' | 'lg';
};

const ProfilePicture = styled.img<UserIconProps>`
  border-radius: 50%;
  object-fit: cover;

  width: ${({ size }) =>
    size === 'sm' ? '36px' : size === 'md' ? '64px' : '96px'};
  height: ${({ size }) =>
    size === 'sm' ? '36px' : size === 'md' ? '64px' : '96px'};

  @media (max-width: 1250px) {
    width: ${({ size }) =>
      size === 'sm' ? '32px' : size === 'md' ? '40px' : '96px'};
    height: ${({ size }) =>
      size === 'sm' ? '32px' : size === 'md' ? '40px' : '96px'};
  }
`;

function UserIcon(props: UserIconProps) {
  return (
    <ProfilePicture
      {...props}
      className="profile"
      src={`${VITE_USER_IMAGE_URL}/${props.profilePhoto}`}
      alt={`${props.username} profile picture`}
    />
  );
}

export default UserIcon;
