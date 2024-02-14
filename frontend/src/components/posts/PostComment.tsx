import { useRef, useState } from 'react';
import styled from 'styled-components';
import { usePostStore } from '../../hooks/usePostStore';
import { Comment } from '../../types/post';
import { Link } from 'react-router-dom';

const PostCommentStyled = styled.form`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 1rem;
  @media (max-width: 700px) {
    padding: 0 0.4rem;
  }
`;

/**
 * A span is used as a textarea so the height adjust with the content.
 */
const CommentInput = styled.span.attrs({
  role: 'textarea',
})`
  font-size: 1.2rem;
  max-height: 6rem;
  width: 100%;
  overflow-y: auto;
  outline: none;

  &:focus {
    border: none;
  }

  &:empty::before {
    content: attr(placeholder);
    color: var(--text-color-gray);
  }
`;

const Button = styled.button`
  color: var(--btn-text-color);
  font-weight: 600;
  border: none;
  cursor: pointer;
  background: none;

  &:hover {
    color: var(--btn-text-color-hover);
  }
`;

const ViewComments = styled(Link)`
  &,
  &:link,
  &:visited {
    color: var(--text-color-gray);
    text-decoration: none;
    font-size: 1.2rem;
  }

  @media (max-width: 700px) {
    padding: 0 0.4rem;
  }
`;
const Comment = styled.p`
  font-size: 1.2rem;
  line-height: 0.6rem;
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

type PostCommentProps = { postId: string; comments: Comment[] };

function PostComment({ postId, comments }: PostCommentProps) {
  const { startCommentingPost } = usePostStore();

  const [comment, setComment] = useState('');
  const commentInputRef = useRef<HTMLSpanElement>(null);
  /**
   * A span is used as a textarea for design purpose.
   *
   * Span element in the change event don't support the "event.target.value".
   *
   * A ref is used to handle changes by accessing the comment via the innerText property.
   */
  const handleChange = () => {
    if (commentInputRef.current) {
      setComment(commentInputRef.current.innerText);
    }
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    startCommentingPost(comment, postId);

    if (commentInputRef.current) {
      commentInputRef.current.innerText = '';
    }
    setComment('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  return (
    <>
      <ViewComments
        to={`${postId}/modal`}
      >{`View all the comments`}</ViewComments>
      {[...comments].reverse().map((comment) => {
        const { username } = comment.user;
        return (
          <Comment key={comment.id}>
            <Username to={`/${username}`}>{username}</Username>
            <span> {comment.comment}</span>
          </Comment>
        );
      })}
      <PostCommentStyled onSubmit={handleSubmit}>
        <CommentInput
          ref={commentInputRef}
          onInput={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Add a comment"
          contentEditable
        />
        {comment && <Button type="submit">Post</Button>}
      </PostCommentStyled>
    </>
  );
}

export default PostComment;
