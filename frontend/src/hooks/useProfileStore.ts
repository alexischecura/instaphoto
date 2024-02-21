import { useParams } from 'react-router-dom';
import { getProfile } from '../api/profileApi';
import {
  errorLoadingProfile,
  setLoadedProfile,
  startLoadingProfile,
  toggleFollowState,
} from '../store/profile/profileSlice';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { useEffect } from 'react';
import { useFollowStore } from './useFollowStore';

export const useProfileStore = () => {
  const dispatch = useAppDispatch();
  const { isLoadingProfile, profile } = useAppSelector(
    (state) => state.profile
  );
  const { isLoadingUserId, toggleFollow } = useFollowStore();

  const isToggleringFollow = isLoadingUserId === profile?.id;

  const { username } = useParams<{ username: string }>();

  if (!username) {
    dispatch(errorLoadingProfile('No username parameter found'));
    throw new Error(
      "No username parameter found, the route to use this hook must be '/:username'"
    );
  }

  useEffect(() => {
    loadProfile();
  }, [username]);

  const loadProfile = async () => {
    dispatch(startLoadingProfile());
    try {
      const profile = await getProfile(username);
      dispatch(setLoadedProfile(profile));
    } catch (error) {
      dispatch(
        errorLoadingProfile('Something went wrong trying to get the profile')
      );
    }
  };
  const toggleFollowProfile = () => {
    dispatch(toggleFollowState());
    if (profile) toggleFollow(profile.id, profile.isFollowing);
  };

  return {
    isLoadingProfile,
    profile,
    isToggleringFollow,
    loadProfile,
    toggleFollowProfile,
  };
};
