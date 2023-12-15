import styled from 'styled-components';

const PostContentStyled = styled.div``;

const Image = styled.img`
  width: 46.8rem;
  border-radius: 3px;
  min-height: 30rem;
`;

type PostContentProps = {
  url: string;
  alt: string;
};

function PostMedia({ url, alt }: PostContentProps) {
  return (
    <PostContentStyled>
      <Image src={url} alt={alt} />
    </PostContentStyled>
  );
}

export default PostMedia;
