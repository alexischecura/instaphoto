import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SimpleProfile } from '../../types/user';

type InitialState = {
  isLoadingSuggestions: boolean;
  suggestedProfiles: SimpleProfile[] | [];
  errorMessage: string | undefined;
};

const initialState: InitialState = {
  isLoadingSuggestions: false,
  suggestedProfiles: [],
  errorMessage: undefined,
};

const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {
    startFollowRequest: (state, action: PayloadAction<string>) => {
      state.suggestedProfiles = state.suggestedProfiles.map((profile) => {
        if (profile.id === action.payload) {
          return { ...profile, isLoading: true };
        }
        return profile;
      });
    },
    successFollowingUser: (state, action: PayloadAction<string>) => {
      state.suggestedProfiles = state.suggestedProfiles.map((profile) => {
        if (profile.id === action.payload) {
          return { ...profile, isFollowing: true, isLoading: false };
        }
        return profile;
      });
    },
    successUnfollowingUser: (state, action: PayloadAction<string>) => {
      state.suggestedProfiles = state.suggestedProfiles.map((profile) => {
        if (profile.id === action.payload) {
          return { ...profile, isFollowing: false, isLoading: false };
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
          return { ...profile, isLoading: false };
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
