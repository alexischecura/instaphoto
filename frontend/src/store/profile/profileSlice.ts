import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Profile } from '../../types/user';

type InitialState = {
  profile: Profile | null;
  isLoadingProfile: boolean;
  errorMessage: string | undefined;
};

const initialState: InitialState = {
  profile: null,
  isLoadingProfile: false,
  errorMessage: undefined,
};

export const profileSlice = createSlice({
  initialState,
  name: 'profile',
  reducers: {
    startLoadingProfile: (state) => {
      state.isLoadingProfile = true;
    },
    setLoadedProfile: (state, action: PayloadAction<Profile>) => {
      state.isLoadingProfile = false;
      state.errorMessage = undefined;
      state.profile = action.payload;
    },
    errorLoadingProfile: (state, action: PayloadAction<string>) => {
      state.isLoadingProfile = false;
      state.errorMessage = action.payload;
    },
    toggleFollowState: (state) => {
      if (state.profile) state.profile.isFollowing = !state.profile.isFollowing;
    },
  },
});

export const {
  startLoadingProfile,
  errorLoadingProfile,
  setLoadedProfile,
  toggleFollowState,
} = profileSlice.actions;
