import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  profilePicture?: string;
};

function UserCard({
  username,
  profilePicture,
  caption,
  buttonLabel,
}: UserCardProps) {
  return (
    <UserCardStyled>
      <UserPicture
        src={`profile-pictures/${
          profilePicture ? profilePicture : 'default_user.jpg'
        }`}
      />
      <UserInfo>
        <Username to={username}>{username}</Username>
        <UserCaption
          style={{ fontSize: `${caption.length > 20 ? '12px' : '14px'}` }}
        >
          {caption}
        </UserCaption>
      </UserInfo>
      <Button>{buttonLabel}</Button>
    </UserCardStyled>
  );
}

export default UserCard;
