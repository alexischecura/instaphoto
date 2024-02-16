import { AxiosError } from 'axios';
import {
  followAnUser,
  getSuggestedProfiles,
  unfollowAnUser,
} from '../api/followApi';
import {
  startSuggestionsLoading,
  setLoadedProfiles,
  reportSuggestionError,
  startFollowRequest,
  successFollowingUser,
  reportFollowError,
  successUnfollowingUser,
} from '../store/follow/followSlice';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { usePostStore } from './usePostStore';

export const useFollowStore = () => {
  const dispatch = useAppDispatch();

  const { isLoadingSuggestions, suggestedProfiles, isLoadingUserId } =
    useAppSelector((state) => state.follow);
  const { startGettingFolloweesPost } = usePostStore();

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

  const toggleFollow = async (id: string, isFollowing: boolean = false) => {
    dispatch(startFollowRequest(id));
    try {
      if (!isFollowing) {
        await followAnUser(id);
        dispatch(successFollowingUser(id));
      } else {
        await unfollowAnUser(id);
        dispatch(successUnfollowingUser(id));
      }
      startGettingFolloweesPost();
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        dispatch(
          reportFollowError({
            errorMessage:
              error.response?.data?.message ||
              'Something went wrong trying to toggle the follow',
            id,
          })
        );
      }
    }
  };

  return {
    suggestedProfiles,
    isLoadingSuggestions,
    isLoadingUserId,
    startGettingSuggestingUsers,
    toggleFollow,
  };
};
