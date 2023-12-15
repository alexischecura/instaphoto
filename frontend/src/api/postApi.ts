import { Post } from '../types/post';
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
