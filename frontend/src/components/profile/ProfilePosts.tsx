import styled from 'styled-components';
import { Post } from '../../types/post';
import NoPost from './NoPost';
import { getEnvVariables } from '../../helpers/getEnvVariables';

const PostContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const PostImage = styled.img`
  height: 100%;
  width: 100%;
  max-height: 31rem;
  max-width: 31rem;

  object-fit: cover;
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
