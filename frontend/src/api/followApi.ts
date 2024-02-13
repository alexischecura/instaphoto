import { BasicResponse, SimpleProfile } from '../types/user';
import instaphotoApi from './instaphotoApi';

export const getSuggestedProfiles = async () => {
  const { data } = await instaphotoApi.get<SimpleProfile[]>(`/follow/suggested`);
  return data;
};

export const followAnUser = async (followerId: string) => {
  const { data } = await instaphotoApi.post<BasicResponse>(`/follow`, {
    followerId,
  });
  return data;
};

export const unfollowAnUser = async (followerId: string) => {
  const { data } = await instaphotoApi.delete<BasicResponse>(`/follow`, {
    data: {
      followerId,
    },
  });
  return data;
};
