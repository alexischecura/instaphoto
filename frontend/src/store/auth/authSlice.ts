import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user';

export enum AuthStatus {
  loading = 'loading',
  authenticated = 'authenticated',
  notAuthenticated = 'not-authenticated',
  emailVerificationPending = 'email-verification-pending',
  emailSuccessfullyVerified = 'email-successfully-verified',
}

type InitialState = {
  status: AuthStatus;
  user: User | Record<PropertyKey, never>;
  errorMessage: undefined | string;
  successMessage: undefined | string;
};

const initialState: InitialState = {
  status: AuthStatus.loading,
  user: {},
  errorMessage: undefined,
  successMessage: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startAuthLoading: (state) => {
      state.status = AuthStatus.loading;
      state.user = {};
      state.errorMessage = undefined;
      state.successMessage = undefined;
    },
    userLoggedIn: (state, action: PayloadAction<User>) => {
      state.status = AuthStatus.authenticated;
      state.user = action.payload;
      state.errorMessage = undefined;
      state.successMessage = 'User successfully logged';
    },
    userLoggedOut: (state, action: PayloadAction<string | undefined>) => {
      state.status = AuthStatus.notAuthenticated;
      state.user = {};
      state.errorMessage = action.payload;
      state.successMessage = 'User successfully logged out';
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = undefined;
    },
  },
});

export const {
  startAuthLoading,
  userLoggedIn,
  userLoggedOut,
  clearSuccessMessage,
  clearErrorMessage,
} = authSlice.actions;

export default authSlice;
