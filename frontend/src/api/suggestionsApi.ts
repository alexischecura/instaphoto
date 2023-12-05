import { Profile } from '../types/user';
import instagramApi from './instagramApi';

export const getSuggestedProfiles = async (id: string) => {
  const { data } = await instagramApi.get<Profile[]>(`/users/suggested/${id}`);
  return data;
};
