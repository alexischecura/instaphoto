import { Post } from '../types/post';
import instagramApi from './instagramApi';

export const getFolloweesPost = async () => {
  const { data } = await instagramApi.get<Post[]>(`/post`);
  return data;
};
