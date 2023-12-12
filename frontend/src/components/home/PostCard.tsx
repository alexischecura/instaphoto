import styled from 'styled-components';
import PostHeader from './PostHeader';
import PostMedia from './PostMedia';
import PostButtons from './PostButtons';
import Likes from './Likes';
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

function PostCard() {
  return (
    <PostCardStyled>
      <PostHeader
        user={{ username: 'alexisrulo', profilePicture: 'alexisrulo.jpg' }}
        postDate={new Date(2023, 11, 11, 15)}
      />
      <PostMedia
        alt="image"
        url="https://images.unsplash.com/photo-1702121269747-fe91af4fa4a8?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <PostButtons isBookmarked={false} isFavorited={true} />
      <Likes postLikes={15} />
      <PostContent text="Yesterday I take this photo 📷 #photo with my friends" />
      <PostComment />
    </PostCardStyled>
  );
}

export default PostCard;
