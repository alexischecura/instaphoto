import styled from 'styled-components';
import MainButton from '../common/MainButton';
import { useRef, useState } from 'react';
import { usePostStore } from '../../hooks/usePostStore';
import { IoCheckmarkCircleOutline, IoImageOutline } from 'react-icons/io5';
import LoadingCircle from '../common/LoadingCircle';

const CreatePostStyled = styled.div`
  width: 60rem;
  min-height: 80rem;
  display: flex;
  flex-direction: column;
`;

const Headline = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
  padding: 0.8rem;
`;
const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: var(--color-gray-700);
`;

const Form = styled.form`
  min-height: 75rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  & input {
    display: none;
  }
  & svg {
    height: 20rem;
    width: 20rem;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60rem;
`;

const ImagePreview = styled.img`
  height: 75rem;
  object-fit: cover;
`;

const Content = styled.div`
  display: flex;

  & button {
    width: 13rem;
    margin: 1.2rem;
  }
`;

const ContentInput = styled.textarea`
  font-family: inherit;
  width: 100%;

  border: none;
  border-right: 1px solid var(--color-gray-700);
  padding: 1rem;
  resize: none;
  max-height: 6rem;

  &:focus {
    outline: none;
  }
`;

const PostMessage = styled.h3`
  height: 75rem;
  text-align: center;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  & svg {
    height: 20rem;
    width: 20rem;
  }
`;

function CreatePost() {
  const { isCreatingPost, startCreatingPost } = usePostStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [postCreated, setPostCreated] = useState<boolean>(false);
  const [formState, setFormState] = useState<{
    image: File | null;
    imageURL: string;
    content: string;
  }>({
    image: null,
    imageURL: '',
    content: '',
  });

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState.image) {
      await startCreatingPost(formState.image, formState.content);
      setPostCreated(true);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((state) => {
      if (e.target.files) {
        return {
          ...state,
          image: e.target.files[0],
          imageURL: URL.createObjectURL(e.target.files[0]),
        };
      }
      return state;
    });

  return (
    <CreatePostStyled>
      <Headline>Create new Post</Headline>
      <Divider />
      {postCreated ? (
        <PostMessage>
          <span>Your post has been shared</span>
          <IoCheckmarkCircleOutline />
        </PostMessage>
      ) : isCreatingPost ? (
        <LoadingCircle />
      ) : (
        <Form onSubmit={handleSubmit}>
          {formState.imageURL ? (
            <ImageContainer>
              <ImagePreview src={formState.imageURL} />
              <Divider />
              <Content>
                <ContentInput
                  id="content"
                  placeholder="Content"
                  onChange={(e) =>
                    setFormState((state) => ({
                      ...state,
                      content: e.target.value,
                    }))
                  }
                  value={formState.content}
                />
                <MainButton text="Create Post" type="submit" />
              </Content>
            </ImageContainer>
          ) : (
            <FileUploadContainer>
              <IoImageOutline />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
              />
              <MainButton
                text="Select from computer"
                type="button"
                onClick={handleButtonClick}
              />
            </FileUploadContainer>
          )}
        </Form>
      )}
    </CreatePostStyled>
  );
}

export default CreatePost;
