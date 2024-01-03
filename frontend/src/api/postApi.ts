import { Comment,Post, LikeResponse } from '../types/post';
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
