import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Profile } from '../../types/user';

type InitialState = {
  isLoading: boolean;
  profiles: Profile[] | [];
  errorMessage: string | undefined;
};

const initialState: InitialState = {
  isLoading: false,
  profiles: [],
  errorMessage: undefined,
};

const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    startSuggestionsLoading: (state) => {
      state.isLoading = true;
      state.profiles = [];
      state.errorMessage = undefined;
    },
    setLoadedProfiles: (state, action: PayloadAction<Profile[]>) => {
      state.isLoading = false;
      state.profiles = action.payload;
      state.errorMessage = undefined;
    },
    reportError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.profiles = [];
      state.errorMessage = action.payload;
    },
  },
});

export const { startSuggestionsLoading, setLoadedProfiles, reportError } =
  suggestionsSlice.actions;

export default suggestionsSlice;
