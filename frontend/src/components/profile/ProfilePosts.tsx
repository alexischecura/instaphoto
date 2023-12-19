import styled from 'styled-components';
import { Post } from '../../types/post';
import NoPost from './NoPost';

const PostImage = styled.img`
  height: 31rem;
  width: 31rem;
  object-fit: cover;
`;

const PostContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
`;

function ProfilePosts({ posts }: { posts: Post[] }) {
  return (
    <PostContainer>
      {posts.length > 0 ? (
        posts.map((post) => {
          return <PostImage src={post.photoUrl} key={post.id} />;
        })
      ) : (
        <NoPost />
      )}
    </PostContainer>
  );
}

export default ProfilePosts;
