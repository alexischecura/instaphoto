import { AxiosError } from 'axios';
import { followAnUser, getSuggestedProfiles } from '../api/followApi';
import {
  startSuggestionsLoading,
  setLoadedProfiles,
  reportSuggestionError,
  startFollowingUser,
  successFollowingUser,
  reportFollowError,
} from '../store/follow/followSlice';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { useEffect } from 'react';

export const useFollowStore = () => {
  const dispatch = useAppDispatch();

  const { isLoadingSuggestions, suggestedProfiles } = useAppSelector(
    (state) => state.follow
  );

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
          reportSuggestionError(
            error.response?.data?.message ||
              'Something went wrong trying to get suggested profiles'
          )
        );
      }
    }
  };

  const followUser = async (id: string) => {
    dispatch(startFollowingUser(id));
    try {
      await followAnUser(id);
      dispatch(successFollowingUser(id));
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        dispatch(
          reportFollowError({
            errorMessage:
              error.response?.data?.message ||
              'Something went wrong trying to follow an user',
            id,
          })
        );
      }
    }
  };

  return {
    suggestedProfiles,
    isLoadingSuggestions,
    followUser,
  };
};
