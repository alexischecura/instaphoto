import styled from 'styled-components';
import PostHeader from './PostHeader';
import PostMedia from './PostMedia';
import PostButtons from './PostButtons';
import PostLikes from './PostLikes';
import PostContent from './PostContent';
import PostComment from './PostComment';
import { Comment, Like } from '../../types/post';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useMemo } from 'react';
import { usePostStore } from '../../hooks/usePostStore';

const PostCardStyled = styled.article`
  width: 52rem;
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

  @media (max-width: 700px) {
    width: auto;
  }
`;

type PostCardProps = {
  username: string;
  profilePhoto: string;
  userId: string;
  postDate: string;
  mediaName: string;
  likes: Like[];
  content: string;
  id: string;
  comments: Comment[];
};

function PostCard({
  username,
  profilePhoto,
  userId,
  postDate,
  mediaName,
  likes,
  content,
  id,
  comments,
}: PostCardProps) {
  const { user } = useAuthStore();
  const { startLikingPost } = usePostStore();

  const isFavorited = useMemo(
    () => likes.some((like) => like.userId === user.id),
    [likes, user]
  );

  return (
    <PostCardStyled>
      <PostHeader
        user={{ username, profilePhoto, userId }}
        postDate={new Date(postDate)}
      />
      <PostMedia
        alt="image"
        photoName={mediaName}
        startLikingPost={startLikingPost}
        postId={id}
        isFavorited={isFavorited}
      />
      <PostButtons
        postId={id}
        isBookmarked={false}
        isFavorited={isFavorited}
        startLikingPost={startLikingPost}
      />
      <PostLikes postLikes={likes.length} />
      <PostContent text={content} username={username} />
      <PostComment postId={id} comments={comments} />
    </PostCardStyled>
  );
}

export default PostCard;
