import styled from 'styled-components';

const LikesStyled = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
`;

function Likes({ postLikes }: { postLikes: number }) {
  return <LikesStyled>{postLikes} likes</LikesStyled>;
}

export default Likes;
