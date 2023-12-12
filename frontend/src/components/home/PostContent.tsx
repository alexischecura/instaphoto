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

type PostContentProps = {
  text: string;
};

function PostContent({ text }: PostContentProps) {
  const parts = text.split(' ');

  const content = parts.map((part) => {
    if (part.charAt(0) === '#') {
      return (
        <Hashtag
          to={`/hashtag/${part.toLowerCase().substring(1)}`}
        >{` ${part}`}</Hashtag>
      );
    }
    return <span>{` ${part}`}</span>;
  });

  return <PostContentStyled>{content}</PostContentStyled>;
}

export default PostContent;
