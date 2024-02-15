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

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
`;

const PostImage = styled.img`
  transform: translateY(-100%);
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function ProfilePosts({ posts }: { posts: Post[] }) {
  const { VITE_POST_IMAGE_URL } = getEnvVariables();
  return (
    <PostContainer>
      {posts.length > 0 ? (
        posts.map((post) => {
          return (
            <ImageContainer key={post.id}>
              <PostImage src={`${VITE_POST_IMAGE_URL}/${post.postPhoto}`} />
            </ImageContainer>
          );
        })
      ) : (
        <NoPost />
      )}
    </PostContainer>
  );
}

export default ProfilePosts;
