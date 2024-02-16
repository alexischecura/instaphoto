import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from './Spinner';

import { getEnvVariables } from '../../helpers/getEnvVariables';

const { VITE_USER_IMAGE_URL } = getEnvVariables();

const UserCardStyled = styled.div`
  width: 32rem;
  padding: 0.8rem 1.6rem;

  display: flex;
  align-items: center;
`;
const UserPicture = styled.img`
  border-radius: 99rem;
  height: 4.4rem;
  width: 4.4rem;
  object-fit: cover;
`;

const UserInfo = styled.div`
  margin-left: 1rem;
  font-size: 1.4rem;
`;

const Username = styled(Link)`
  &,
  &:link,
  &:visited {
    display: block;
    color: inherit;
    text-decoration: none;
    font-weight: 600;
  }
`;

const UserCaption = styled.span`
  color: var(--text-color-gray);
`;

const Button = styled.button`
  margin-left: auto;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--btn-text-color);
  cursor: pointer;

  background: none;
  border: none;

  &:hover {
    color: var(--btn-text-color-hover);
  }
`;

type UserCardProps = {
  username: string;
  caption: string;
  buttonLabel: string;
  profilePhoto?: string;
  onClick?: () => void;
  isLoading?: boolean;
};

function UserCard({
  username,
  profilePhoto,
  caption,
  buttonLabel,
  onClick,
  isLoading,
}: UserCardProps) {
  return (
    <UserCardStyled>
      <UserPicture src={`${VITE_USER_IMAGE_URL}/${profilePhoto}`} />
      <UserInfo>
        <Username to={username}>{username}</Username>
        <UserCaption
          style={{ fontSize: `${caption.length > 20 ? '12px' : '14px'}` }}
        >
          {caption}
        </UserCaption>
      </UserInfo>
      <Button onClick={onClick} disabled={isLoading}>
        {isLoading ? <Spinner color="#777" /> : buttonLabel}
      </Button>
    </UserCardStyled>
  );
}

export default UserCard;
