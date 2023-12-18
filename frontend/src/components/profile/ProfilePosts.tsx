import styled from 'styled-components';
import { Post } from '../../types/post';

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
      {posts.map((post) => {
        return <PostImage src={post.photoUrl} key={post.id} />;
      })}
    </PostContainer>
  );
}

export default ProfilePosts;
