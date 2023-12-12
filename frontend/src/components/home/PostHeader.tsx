import { formatDistanceToNowStrict } from 'date-fns';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import styled from 'styled-components';

const PostHeaderStyled = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
`;

const ProfilePicture = styled.img`
  height: 3.2rem;
  width: 3.2rem;
  object-fit: cover;
  border-radius: 99rem;
  margin-right: 1.2rem;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 1.3rem;
`;
const PostDate = styled.span`
  font-size: 1.3rem;
  color: var(--text-color-gray);
`;

const Dot = styled.span`
  color: var(--text-color-gray);
  font-size: 1.4rem;
  margin: 0 0.4rem;
`;

const Button = styled.button`
  background-color: inherit;
  border: none;
  margin-left: auto;
  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

type PostHeaderProps = {
  user: {
    username: string;
    profilePicture?: string;
  };
  postDate: Date;
};

function PostHeader({ user, postDate }: PostHeaderProps) {
  return (
    <PostHeaderStyled>
      <ProfilePicture
        src={`profile-pictures/${
          user.profilePicture ? user.profilePicture : 'default_user.jpg'
        }`}
        alt={`${user.username} profile picture`}
      />
      <div>
        <Username>{user.username}</Username>
        <Dot>•</Dot>
        <PostDate>{formatDistanceToNowStrict(postDate)}</PostDate>
      </div>
      <Button>
        <IoEllipsisHorizontal />
      </Button>
    </PostHeaderStyled>
  );
}

export default PostHeader;
