import { Profile } from '../types/user';
import instagramApi from './instagramApi';

export const getProfile = async (username: string) => {
  const { data } = await instagramApi.get<Profile>(`/users/profile/${username}`);
  return data;
};
