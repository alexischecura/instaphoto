import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { hashtagRegex } from '../../helpers/regexs';

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
  const parts = text.split(hashtagRegex);
  const hashtags = text.match(hashtagRegex);
  const content = parts.map((part, index) => (
    <span key={index}>
      {part}
      {hashtags && hashtags[index] && (
        <Hashtag to={`/hashtag/${hashtags[index].substring(1)}`}>
          {hashtags[index]}
        </Hashtag>
      )}
    </span>
  ));

  return <PostContentStyled>{content}</PostContentStyled>;
}

export default PostContent;
