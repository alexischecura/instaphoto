import { BasicResponse, SimpleProfile } from '../types/user';
import instagramApi from './instagramApi';

export const getSuggestedProfiles = async () => {
  const { data } = await instagramApi.get<SimpleProfile[]>(`/follow/suggested`);
  return data;
};

export const followAnUser = async (followerId: string) => {
  const { data } = await instagramApi.post<BasicResponse>(`/follow`, {
    followerId,
  });
  return data;
};

export const unfollowAnUser = async (followerId: string) => {
  const { data } = await instagramApi.delete<BasicResponse>(`/follow`, {
    data: {
      followerId,
    },
  });
  return data;
};
