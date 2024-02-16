import { formatDistanceToNowStrict } from 'date-fns';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getEnvVariables } from '../../helpers/getEnvVariables';
import { useState } from 'react';
import Modal from '../common/Modal';
import MenuCard from '../common/MenuCard';
import { usePostStore } from '../../hooks/usePostStore';

const { VITE_USER_IMAGE_URL } = getEnvVariables();

const PostHeaderStyled = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  @media (max-width: 700px) {
    padding: 0 0.4rem;
  }
`;

const ProfilePicture = styled.img`
  height: 3.2rem;
  width: 3.2rem;
  object-fit: cover;
  border-radius: 99rem;
  margin-right: 1.2rem;
`;

const Username = styled(Link)`
  &,
  &:link,
  &:visited {
    text-decoration: none;
    color: inherit;
    font-weight: 600;
    font-size: 1.3rem;

    display: flex;
    align-items: center;
  }
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
  cursor: pointer;
  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

type PostHeaderProps = {
  user: {
    username: string;
    profilePhoto: string;
    userId: string;
  };
  postDate: Date;
};

function PostHeader({ user, postDate }: PostHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { unfollowUser } = usePostStore();

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <PostHeaderStyled>
      <Username to={user.username}>
        <ProfilePicture
          src={`${VITE_USER_IMAGE_URL}/${user.profilePhoto}`}
          alt={`${user.username} profile picture`}
        />
        <span>{user.username}</span>
      </Username>
      <Dot>•</Dot>
      <PostDate>{formatDistanceToNowStrict(postDate)}</PostDate>
      <Button onClick={openModal}>
        <IoEllipsisHorizontal />
      </Button>
      {isModalOpen && (
        <Modal onCloseModal={closeModal}>
          <MenuCard>
            <MenuCard.Button onClick={() => unfollowUser(user.userId)} danger>
              Unfollow
            </MenuCard.Button>
            <MenuCard.Button
              onClick={() => {
                navigate(user.username);
              }}
            >
              Go to post
            </MenuCard.Button>
            <MenuCard.Button
              onClick={() => {
                navigate(user.username);
              }}
            >
              Go to profile
            </MenuCard.Button>
          </MenuCard>
        </Modal>
      )}
    </PostHeaderStyled>
  );
}

export default PostHeader;
