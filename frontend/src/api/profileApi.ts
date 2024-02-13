import { Profile } from '../types/user';
import instaphotoApi from './instaphotoApi';

export const getProfile = async (username: string) => {
  const { data } = await instaphotoApi.get<Profile>(`/users/profile/${username}`);
  return data;
};
