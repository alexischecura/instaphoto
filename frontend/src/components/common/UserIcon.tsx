import styled from 'styled-components';
import { getEnvVariables } from '../../helpers/getEnvVariables';

const { VITE_USER_IMAGE_URL } = getEnvVariables();

type UserIconProps = {
  profilePhoto: string;
  username: string;
};

const ProfilePicture = styled.div`
  border-radius: 50%;
  overflow: hidden;
  object-fit: none;
  height: 2.6rem;
  width: 2.6rem;

  & img {
    width: 100%;
    height: 100%;
  }
`;

function UserIcon({ profilePhoto, username }: UserIconProps) {
  return (
    <ProfilePicture className="profile">
      <img
        src={`${VITE_USER_IMAGE_URL}/${profilePhoto}`}
        alt={`${username} profile picture`}
      />
    </ProfilePicture>
  );
}

export default UserIcon;
