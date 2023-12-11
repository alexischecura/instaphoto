import { BasicResponse, Profile } from '../types/user';
import instagramApi from './instagramApi';

export const getSuggestedProfiles = async () => {
  const { data } = await instagramApi.get<Profile[]>(`/follow/suggested`);
  return data;
};

export const followAnUser = async (followerId: string) => {
  const { data } = await instagramApi.post<BasicResponse>(`/follow`, {
    followerId,
  });
  return data;
};
