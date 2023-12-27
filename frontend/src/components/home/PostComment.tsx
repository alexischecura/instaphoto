import { useRef, useState } from 'react';
import styled from 'styled-components';
import { usePostStore } from '../../hooks/usePostStore';

const PostCommentStyled = styled.form`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 1rem;
`;

const CommentInput = styled.span`
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

function PostComment({ postId }: { postId: string }) {
  const [comment, setComment] = useState('');
  const commentInputRef = useRef<HTMLSpanElement>(null);
  const { startCommentingPost } = usePostStore();

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const commentResponse = await startCommentingPost(comment, postId);
    console.log(commentResponse);

    if (commentInputRef.current) {
      commentInputRef.current.innerText = '';
    }
    setComment('');
  };

  const handleChange = () => {
    if (commentInputRef.current) {
      setComment(commentInputRef.current.innerText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  return (
    <PostCommentStyled onSubmit={handleSubmit}>
      <CommentInput
        ref={commentInputRef}
        onInput={handleChange}
        onKeyDown={handleKeyDown}
        role="textbox"
        placeholder="Add a comment"
        contentEditable
      />
      {comment && <Button type="submit">Post</Button>}
    </PostCommentStyled>
  );
}

export default PostComment;
