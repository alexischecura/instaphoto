import { AxiosError } from 'axios';
import { getFolloweesPost } from '../api/postApi';
import {
  reportPostError,
  startPostRequest,
  setLoadedPosts,
} from '../store/post/postSlice';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { useEffect } from 'react';

export const usePostStore = () => {
  const dispatch = useAppDispatch();

  const { followeesPosts, isLoadingPost } = useAppSelector(
    (state) => state.post
  );

  useEffect(() => {
    startGettingFolloweesPost();
  }, []);

  const startGettingFolloweesPost = async () => {
    dispatch(startPostRequest());
    try {
      const posts = await getFolloweesPost();
      dispatch(setLoadedPosts(posts));
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        dispatch(
          reportPostError(
            error.response?.data?.message ||
              'Something went wrong trying to get suggested profiles'
          )
        );
      }
    }
  };

  return { isLoadingPost, followeesPosts, startGettingFolloweesPost };
};
