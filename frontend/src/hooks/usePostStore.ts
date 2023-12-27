import { AxiosError } from 'axios';
import { commentPost, getFolloweesPost, likePost } from '../api/postApi';
import {
  reportPostError,
  startPostRequest,
  setLoadedPosts,
  loadMorePost,
} from '../store/post/postSlice';
import { useAppDispatch, useAppSelector } from './reduxHooks';

export const usePostStore = () => {
  const dispatch = useAppDispatch();

  const { followeesPosts, isLoadingPost, page } = useAppSelector(
    (state) => state.post
  );

  const startGettingFolloweesPost = async () => {
    dispatch(startPostRequest());
    try {
      const posts = await getFolloweesPost(1, 3);
      dispatch(setLoadedPosts(posts));
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        dispatch(
          reportPostError(
            error.response?.data?.message ||
              'Something went wrong trying to get followees post'
          )
        );
      }
    }
  };

  const startLoadingMorePost = async () => {
    try {
      const posts = await getFolloweesPost(page, 3);
      if (!posts) {
        return;
      }
      dispatch(loadMorePost(posts));
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        dispatch(
          reportPostError(
            error.response?.data?.message ||
              'Something went wrong trying to get followees post'
          )
        );
      }
    }
  };

  const startCommentingPost = async (comment: string, postId: string) => {
    try {
      const commentResponse = await commentPost(comment, postId);
      return commentResponse;
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        dispatch(
          reportPostError(
            error.response?.data?.message ||
              'Something went wrong trying to comment the post'
          )
        );
      }
    }
  };
  const startLikingPost = async (postId: string) => {
    try {
      const likeResponse = await likePost(postId);
      return likeResponse;
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        dispatch(
          reportPostError(
            error.response?.data?.message ||
              'Something went wrong trying to comment the post'
          )
        );
      }
    }
  };

  return {
    isLoadingPost,
    followeesPosts,
    page,
    startGettingFolloweesPost,
    startLoadingMorePost,
    startCommentingPost,
    startLikingPost,
  };
};
