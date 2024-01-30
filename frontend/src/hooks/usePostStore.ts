import { AxiosError } from 'axios';
import {
  commentPost,
  createPost,
  getFolloweesPost,
  likePost,
} from '../api/postApi';
import {
  reportPostError,
  startPostRequest,
  setLoadedPosts,
  loadMorePost,
  setLikedPost,
  setUnlikedPost,
  setCommentInPost,
  startCreatePostRequest,
  postCreated,
  resetCreatePost,
} from '../store/post/postSlice';
import { useAppDispatch, useAppSelector } from './reduxHooks';

export const usePostStore = () => {
  const dispatch = useAppDispatch();

  const {
    followeesPosts,
    isLoadingPost,
    isCreatingPost,
    createdSuccessfully,
    page,
  } = useAppSelector((state) => state.post);

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
      dispatch(setCommentInPost(commentResponse));
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
      if (likeResponse.action === 'like') {
        dispatch(setLikedPost(likeResponse.like));
      }
      if (likeResponse.action === 'unlike') {
        dispatch(setUnlikedPost(likeResponse.like));
      }
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

  const startCreatingPost = async (image: File, content: string) => {
    try {
      dispatch(startCreatePostRequest());
      await createPost(image, content);
      dispatch(postCreated());
      setTimeout(() => {
        dispatch(resetCreatePost());
      }, 2000);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        dispatch(
          reportPostError(
            error.response?.data?.message ||
              'Something went wrong trying to create the post'
          )
        );
      }
    }
  };

  return {
    isLoadingPost,
    isCreatingPost,
    followeesPosts,
    createdSuccessfully,
    page,
    startGettingFolloweesPost,
    startLoadingMorePost,
    startCommentingPost,
    startLikingPost,
    startCreatingPost,
  };
};
