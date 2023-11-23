import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import { LoginUserResponse, LoginUserType } from '../types/user';

import { loginUser } from '../api/instagramApi';
import type { RootState, AppDispatch } from '../store/store';
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from '../store/auth/authSlice';
import { AxiosError } from 'axios';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAuthStore = () => {
  const { status, errorMessage, user } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();

  const startLogin = async ({ identifier, password }: LoginUserType) => {
    dispatch(onChecking());

    try {
      const data: LoginUserResponse = await loginUser({ identifier, password });
      console.log(data);
      dispatch(onLogin(data.user));
    } catch (error) {
      console.error({ error });
      if (error instanceof AxiosError) {
        dispatch(
          onLogout(error.response?.data?.message || 'Incorrect credentials')
        );
      } else {
        dispatch(onLogout('An unknown error occurred.'));
      }
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10000);
    }
  };

  return { status, errorMessage, user, startLogin, checkAuthToken };
};
