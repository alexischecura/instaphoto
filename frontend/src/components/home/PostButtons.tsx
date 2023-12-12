import styled from 'styled-components';
import {
  IoBookmarkOutline,
  IoBookmarkSharp,
  IoChatbubbleOutline,
  IoHeartOutline,
  IoHeartSharp,
} from 'react-icons/io5';

const PostButtonsStyled = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;

  & button:last-child {
    margin-left: auto;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  &:hover svg {
    color: var(--text-color-gray);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
  }

  & svg.red {
    color: var(--color-red-900);
  }
`;

type PostButtons = {
  isFavorited: boolean;
  isBookmarked: boolean;
};

function PostButtons({ isFavorited, isBookmarked }: PostButtons) {
  return (
    <PostButtonsStyled>
      <Button>
        {isFavorited ? <IoHeartSharp className="red" /> : <IoHeartOutline />}
      </Button>
      <Button>
        <IoChatbubbleOutline />
      </Button>
      <Button>
        {isBookmarked ? <IoBookmarkSharp /> : <IoBookmarkOutline />}
      </Button>
    </PostButtonsStyled>
  );
}

export default PostButtons;
