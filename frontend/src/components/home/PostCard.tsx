import styled from 'styled-components';
import PostHeader from './PostHeader';
import PostMedia from './PostMedia';
import PostButtons from './PostButtons';
import PostLikes from './PostLikes';
import PostContent from './PostContent';
import PostComment from './PostComment';
import { Like } from '../../types/post';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useMemo } from 'react';

const PostCardStyled = styled.article`
  width: 47rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 2rem;

  &:not(:last-child):after {
    content: '';
    margin-top: 0.8rem;
    height: 1px;
    background-color: var(--color-gray-700);
    width: 100%;
  }
`;

type PostCardProps = {
  username: string;
  profilePhoto: string;
  postDate: string;
  mediaUrl: string;
  likes: Like[];
  content: string;
  id: string;
};

function PostCard({
  username,
  profilePhoto,
  postDate,
  mediaUrl,
  likes,
  content,
  id,
}: PostCardProps) {
  const { user } = useAuthStore();

  const isFavorited = useMemo(
    () => likes.some((like) => like.userId === user.id),
    [likes, user]
  );

  return (
    <PostCardStyled>
      <PostHeader
        user={{ username, profilePhoto }}
        postDate={new Date(postDate)}
      />
      <PostMedia alt="image" url={mediaUrl} />
      <PostButtons isBookmarked={false} isFavorited={isFavorited} />
      <PostLikes postLikes={likes.length} />
      <PostContent text={content} />
      <PostComment postId={id} />
    </PostCardStyled>
  );
}

export default PostCard;
