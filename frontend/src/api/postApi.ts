import { Comment, Post, LikeResponse, CreatePostResponse } from '../types/post';
import instagramApi from './instagramApi';

export const getFolloweesPost = async (page?: number, limit?: number) => {
  const { data } = await instagramApi.get<Post[]>(`/post`, {
    params: {
      page,
      limit,
    },
  });
  return data;
};

export const commentPost = async (comment: string, postId: string) => {
  const { data } = await instagramApi.post<Comment>(`/post/${postId}/comment`, {
    comment,
  });
  return data;
};

export const likePost = async (postId: string) => {
  const { data } = await instagramApi.post<LikeResponse>(
    `/post/${postId}/like`
  );
  return data;
};

export const createPost = async (image: File, content: string) => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('content', content);
  
  const { data } = await instagramApi.post<CreatePostResponse>(
    `/post`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return data;
};
