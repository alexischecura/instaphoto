import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user';

export enum AuthStatus {
  checking = 'checking',
  authenticated = 'authenticated',
  notAuthenticated = 'not-authenticated',
}

type InitialState = {
  status: AuthStatus;
  user: User | Record<PropertyKey, never>;
  errorMessage: undefined | string;
};

const initialState: InitialState = {
  status: AuthStatus.checking,
  user: {},
  errorMessage: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = AuthStatus.checking;
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, action: PayloadAction<User>) => {
      state.status = AuthStatus.authenticated;
      state.user = action.payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, action: PayloadAction<string | undefined>) => {
      state.status = AuthStatus.notAuthenticated;
      state.user = {};
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } =
  authSlice.actions;

export default authSlice;
