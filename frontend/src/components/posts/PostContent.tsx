import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostContentStyled = styled.p`
  font-size: 1.2rem;
`;

const Hashtag = styled(Link)`
  &:link,
  &:visited {
    text-decoration: none;
    font-family: inherit;
    font-size: inherit;
    font-weight: 500;
    color: var(--hashtag-color);
  }
`;

const Username = styled(Link)`
  &,
  &:link,
  &:visited {
    text-decoration: none;
    color: inherit;
    font-weight: 600;
    font-size: inherit;
  }
`;

type PostContentProps = {
  text: string;
  username: string;
};

function PostContent({ text, username }: PostContentProps) {
  const parts = text.split(' ');

  const content = parts.map((part) => {
    if (part.charAt(0) === '#') {
      return (
        <Hashtag
          key={part}
          to={`/hashtag/${part.toLowerCase().substring(1)}`}
        >{` ${part}`}</Hashtag>
      );
    }
    return ` ${part}`;
  });

  return (
    <PostContentStyled>
      <Username to={`/${username}`}>{username}</Username>
      <span>{content}</span>
    </PostContentStyled>
  );
}

export default PostContent;
