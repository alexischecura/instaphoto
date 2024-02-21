import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SimpleProfile } from '../../types/user';

type InitialState = {
  isLoadingSuggestions: boolean;
  isLoadingUserId: string;
  suggestedProfiles: SimpleProfile[] | [];
  errorMessage: string | undefined;
};

const initialState: InitialState = {
  isLoadingSuggestions: false,
  isLoadingUserId: '',
  suggestedProfiles: [],
  errorMessage: undefined,
};

const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {
    startFollowRequest: (state, action: PayloadAction<string>) => {
      state.isLoadingUserId = action.payload;
    },
    successFollowingUser: (state, action: PayloadAction<string>) => {
      state.isLoadingUserId = '';
      state.suggestedProfiles = state.suggestedProfiles.map((profile) => {
        if (profile.id === action.payload) {
          return { ...profile, isFollowing: true };
        }
        return profile;
      });
    },
    successUnfollowingUser: (state, action: PayloadAction<string>) => {
      state.isLoadingUserId = ''
      state.suggestedProfiles = state.suggestedProfiles.map((profile) => {
        if (profile.id === action.payload) {
          return { ...profile, isFollowing: false };
        }
        return profile;
      });
    },
    startSuggestionsLoading: (state) => {
      state.isLoadingSuggestions = true;
      state.suggestedProfiles = [];
      state.errorMessage = undefined;
    },
    setLoadedProfiles: (state, action: PayloadAction<SimpleProfile[]>) => {
      state.isLoadingSuggestions = false;
      state.suggestedProfiles = action.payload.map((profile) => ({
        ...profile,
        isFollowing: false,
      }));
      state.errorMessage = undefined;
    },
    reportSuggestionError: (state, action: PayloadAction<string>) => {
      state.isLoadingSuggestions = false;
      state.suggestedProfiles = [];
      state.errorMessage = action.payload;
    },
    reportFollowError: (
      state,
      action: PayloadAction<{ id: string; errorMessage: string }>
    ) => {
      state.errorMessage = action.payload.errorMessage;
      state.suggestedProfiles = state.suggestedProfiles.map((profile) => {
        if (profile.id === action.payload.id) {
          return { ...profile };
        }
        return profile;
      });
    },
  },
});

export const {
  startSuggestionsLoading,
  setLoadedProfiles,
  reportSuggestionError,
  reportFollowError,
  startFollowRequest,
  successFollowingUser,
  successUnfollowingUser,
} = followSlice.actions;

export default followSlice;
