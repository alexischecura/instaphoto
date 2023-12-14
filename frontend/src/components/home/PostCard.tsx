import styled from 'styled-components';
import PostHeader from './PostHeader';
import PostMedia from './PostMedia';
import PostButtons from './PostButtons';
import PostLikes from './PostLikes';
import PostContent from './PostContent';
import PostComment from './PostComment';

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
  likes: number;
  content: string;
};

function PostCard({
  username,
  profilePhoto,
  postDate,
  mediaUrl,
  likes,
  content,
}: PostCardProps) {
  return (
    <PostCardStyled>
      <PostHeader
        user={{ username, profilePhoto }}
        postDate={new Date(postDate)}
      />
      <PostMedia alt="image" url={mediaUrl} />
      <PostButtons isBookmarked={false} isFavorited={true} />
      <PostLikes postLikes={likes} />
      <PostContent text={content} />
      <PostComment />
    </PostCardStyled>
  );
}

export default PostCard;
