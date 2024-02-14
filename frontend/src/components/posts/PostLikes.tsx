import styled from 'styled-components';

const PostLikesStyled = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
  @media (max-width: 700px) {
    padding: 0 0.4rem;
  }
`;

function PostLikes({ postLikes }: { postLikes: number }) {
  return <PostLikesStyled>{postLikes} likes</PostLikesStyled>;
}

export default PostLikes;
