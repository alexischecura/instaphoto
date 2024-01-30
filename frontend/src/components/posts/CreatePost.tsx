import styled from 'styled-components';
import MainButton from '../common/MainButton';
import { useEffect, useRef, useState } from 'react';
import { usePostStore } from '../../hooks/usePostStore';

const CreatePostStyled = styled.div`
  width: 60rem;
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
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const LabelFileUpload = styled.label`
  & input {
    display: none;
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

function CreatePost({ onCloseModal }: { onCloseModal: () => void }) {
  const { isCreatingPost, startCreatingPost, createdSuccessfully } =
    usePostStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState.image) startCreatingPost(formState.image, formState.content);
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

  useEffect(() => {
    if (createdSuccessfully) {
      setTimeout(() => {
        onCloseModal();
      }, 2000);
    }
  }, [createdSuccessfully, onCloseModal]);

  return (
    <CreatePostStyled>
      <Headline>Create new Post</Headline>
      <Divider />
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
          <LabelFileUpload>
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
          </LabelFileUpload>
        )}
      </Form>
    </CreatePostStyled>
  );
}

export default CreatePost;
