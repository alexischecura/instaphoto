import styled from 'styled-components';
import { getEnvVariables } from '../../helpers/getEnvVariables';

const { VITE_USER_IMAGE_URL } = getEnvVariables();

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
        src={`${VITE_USER_IMAGE_URL}/${profilePhoto}`}
        alt={`${username} profile picture`}
      />
    </>
  );
}

export default UserIcon;
