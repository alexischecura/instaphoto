import styled from 'styled-components';
import { Post } from '../../types/post';
import NoPost from './NoPost';
import { getEnvVariables } from '../../helpers/getEnvVariables';

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
  const { VITE_POST_IMAGE_URL } = getEnvVariables();
  return (
    <PostContainer>
      {posts.length > 0 ? (
        posts.map((post) => {
          return (
            <PostImage
              src={`${VITE_POST_IMAGE_URL}/${post.postPhoto}`}
              key={post.id}
            />
          );
        })
      ) : (
        <NoPost />
      )}
    </PostContainer>
  );
}

export default ProfilePosts;
