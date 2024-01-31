import styled from 'styled-components';

const PostLikesStyled = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
`;

function PostLikes({ postLikes }: { postLikes: number }) {
  return <PostLikesStyled>{postLikes} likes</PostLikesStyled>;
}

export default PostLikes;
