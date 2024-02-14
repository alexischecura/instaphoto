import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoHeartSharp } from 'react-icons/io5';
import { LikeResponse } from '../../types/post';
import { getEnvVariables } from '../../helpers/getEnvVariables';

const PostContentStyled = styled.div`
  position: relative;

  @keyframes like-heart {
    15% {
      transform: scale(1.2);
    }
    30% {
      transform: scale(0.95);
    }
    80% {
      transform: scale(1);
    }
  }
`;

const Heart = styled(IoHeartSharp)`
  height: 20rem;
  width: 20rem;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  fill: #fff;
  transform: scale(0);

  &.animate {
    animation-name: like-heart;
    animation-duration: 1000ms;
    animation-timing-function: ease-in-out;
  }
`;

const Image = styled.img`
  user-select: none;
  width: 100%;
  border-radius: 4px;
  min-height: 30rem;

  @media (max-width: 700px) {
    border-radius: 0;
  }
`;

type PostContentProps = {
  photoName: string;
  alt: string;
  isFavorited: boolean;
  postId: string;
  startLikingPost: (postId: string) => Promise<LikeResponse | undefined>;
};

function PostMedia({
  photoName,
  alt,
  postId,
  startLikingPost,
  isFavorited,
}: PostContentProps) {
  const [animate, setAnimate] = useState(false);
  const [isOldLike, setIsOldLike] = useState(isFavorited);
  const { VITE_POST_IMAGE_URL } = getEnvVariables();

  const runAnimation = () => {
    setAnimate(true);

    setTimeout(() => {
      setAnimate(false);
    }, 1000);
  };

  const handleLike = () => {
    if (!isFavorited) startLikingPost(postId);
    setIsOldLike(false);
    runAnimation();
  };

  useEffect(() => {
    if (!isOldLike && isFavorited) runAnimation();

    setIsOldLike(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFavorited]);

  return (
    <PostContentStyled onDoubleClick={handleLike}>
      <Heart className={`${animate ? 'animate' : ''}`} />
      <Image src={`${VITE_POST_IMAGE_URL}/${photoName}`} alt={alt} />
    </PostContentStyled>
  );
}

export default PostMedia;
