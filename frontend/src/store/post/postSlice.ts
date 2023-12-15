import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/post';

type InitialState = {
  isLoadingPost: boolean;
  followeesPosts: Post[] | [];
  errorMessage: string | undefined;
};

const initialState: InitialState = {
  isLoadingPost: false,
  followeesPosts: [],
  errorMessage: undefined,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    startPostRequest: (state) => {
      state.isLoadingPost = true;
    },
    setLoadedPosts: (state, action: PayloadAction<Post[]>) => {
      state.isLoadingPost = false;
      state.followeesPosts = action.payload;
    },
    loadMorePost: (state, action: PayloadAction<Post[]>) => {
      state.isLoadingPost = false;
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
} = postSlice.actions;

export default postSlice;
