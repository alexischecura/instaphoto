import { AxiosError } from 'axios';
import { getSuggestedProfiles } from '../api/followApi';
import {
  startSuggestionsLoading,
  setLoadedProfiles,
  reportError,
} from '../store/suggestions/suggestionsSlice';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { useEffect } from 'react';

export const useFollowStore = () => {
  const dispatch = useAppDispatch();

  const { isLoading, profiles } = useAppSelector((state) => state.suggestions);

  useEffect(() => {
    startGettingSuggestingUsers();
  }, []);

  const startGettingSuggestingUsers = async () => {
    dispatch(startSuggestionsLoading());
    try {
      const profiles = await getSuggestedProfiles();
      dispatch(setLoadedProfiles(profiles));
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        dispatch(
          reportError(
            error.response?.data?.message ||
              'Something went wrong trying to get suggested profiles'
          )
        );
      }
    }
  };

  const followUser = async (id: string) => {
    console.log(id);
  };

  return { profiles, isLoading, followUser };
};
