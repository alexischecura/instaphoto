import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import {
  BasicResponse,
  EmailVerificationType,
  LoginUserResponse,
  LoginUserType,
  SignUpUserType,
} from '../types/user';

import {
  getCurrentUser,
  loginUser,
  signUpUser,
  verifyUser,
} from '../api/instagramApi';
import type { RootState, AppDispatch } from '../store/store';
import {
  onLoading,
  onLogin,
  onLogout,
  onSignUp,
  onVerfiticationEmail,
} from '../store/auth/authSlice';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAuthStore = () => {
  const { status, errorMessage, user } = useAppSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const startLogin = async (user: LoginUserType) => {
    dispatch(onLoading());

    try {
      const data: LoginUserResponse = await loginUser(user);
      dispatch(onLogin(data.user));
      navigate('/');
    } catch (error) {
      console.error({ error });
      if (error instanceof AxiosError) {
        dispatch(
          onLogout(
            error.response?.data?.message ||
              'Something went wrong trying to login in'
          )
        );
      } else {
        dispatch(onLogout('An unknown error occurred.'));
      }
    }
  };

  const startSignUp = async (user: SignUpUserType) => {
    dispatch(onLoading());

    try {
      const data: BasicResponse = await signUpUser(user);
      dispatch(onSignUp(data.message));
      navigate('/verification');
    } catch (error) {
      console.error({ error });
      if (error instanceof AxiosError) {
        dispatch(
          onLogout(
            error.response?.data?.message ||
              'Something went wrong trying to sing up'
          )
        );
      } else {
        dispatch(onLogout('An unknown error occurred.'));
      }
    }
  };

  const startVerificationEmail = async ({
    verificationCode,
  }: EmailVerificationType) => {
    dispatch(onLoading());
    try {
      const data: BasicResponse = await verifyUser({ verificationCode });
      dispatch(onVerfiticationEmail(data.message));
      navigate('/login');
    } catch (error) {
      console.error({ error });
      if (error instanceof AxiosError) {
        dispatch(
          onLogout(
            error.response?.data?.message ||
              'Something went wrong trying to verify the email'
          )
        );
      } else {
        dispatch(onLogout('An unknown error occurred.'));
      }
    }
    console.log(verificationCode);
  };

  const checkAuthToken = async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        dispatch(onLogin(user));
        navigate('/');
      } else {
        dispatch(onLogout());
      }
    } catch (error) {
      dispatch(onLogout());
    }
  };

  return {
    status,
    errorMessage,
    user,
    startLogin,
    startSignUp,
    startVerificationEmail,
    checkAuthToken,
  };
};
