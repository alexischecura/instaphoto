import { useParams } from 'react-router-dom';
import { getProfile } from '../api/profileApi';
import {
  errorLoadingProfile,
  setLoadedProfile,
  startLoadingProfile,
} from '../store/profile/profileSlice';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { useEffect } from 'react';

export const useProfileStore = () => {
  const dispatch = useAppDispatch();
  const { isLoadingProfile, profile } = useAppSelector(
    (state) => state.profile
  );
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
      console.log(profile);
      dispatch(setLoadedProfile(profile));
    } catch (error) {
      dispatch(
        errorLoadingProfile('Something went wrong trying to get the profile')
      );
    }
  };

  return { isLoadingProfile, profile, loadProfile };
};
