import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comment, Like, Post } from '../../types/post';

type InitialState = {
  isLoadingPost: boolean;
  isCreatingPost: boolean;
  followeesPosts: Post[] | [];
  errorMessage: string | undefined;
  page: number;
};

const initialState: InitialState = {
  isLoadingPost: false,
  isCreatingPost: false,
  followeesPosts: [],
  errorMessage: undefined,
  page: 2,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    startPostRequest: (state) => {
      state.isLoadingPost = true;
    },
    startCreatePostRequest: (state) => {
      state.isCreatingPost = true;
    },
    postCreated: (state) => {
      state.isCreatingPost = false;
    },
    setLoadedPosts: (state, action: PayloadAction<Post[]>) => {
      state.isLoadingPost = false;
      state.page = 2;
      state.followeesPosts = action.payload;
    },
    setLikedPost: (state, { payload }: PayloadAction<Like>) => {
      state.followeesPosts = state.followeesPosts.map((post) => {
        if (post.id === payload.postId) {
          const updatedPost = { ...post };
          updatedPost.likes = [...updatedPost.likes, payload];
          return updatedPost;
        }
        return post;
      });
    },
    setUnlikedPost: (state, { payload }: PayloadAction<Like>) => {
      state.followeesPosts = state.followeesPosts.map((post) => {
        if (post.id === payload.postId) {
          post.likes = post.likes.filter((like) => like.id !== payload.id);
        }
        return post;
      });
    },
    setCommentInPost: (state, action: PayloadAction<Comment>) => {
      state.followeesPosts = state.followeesPosts.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            comments: [action.payload, ...post.comments.slice(0, 1)],
          };
        }
        return post;
      });
    },
    loadMorePost: (state, action: PayloadAction<Post[]>) => {
      state.isLoadingPost = false;
      ++state.page;
      state.followeesPosts = [...state.followeesPosts, ...action.payload];
    },
    reportPostError: (state, action: PayloadAction<string>) => {
      state.isLoadingPost = false;
      state.errorMessage = action.payload;
    },
  },
});

export const {
  reportPostError,
  startPostRequest,
  setLoadedPosts,
  loadMorePost,
  setLikedPost,
  setUnlikedPost,
  setCommentInPost,
  startCreatePostRequest,
  postCreated,
} = postSlice.actions;

export default postSlice;
