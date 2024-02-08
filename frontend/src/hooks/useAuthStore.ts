import {
  BasicResponse,
  EmailVerificationType,
  LoginUserResponse,
  LoginUserType,
  SignUpUserType,
} from '../types/user';

import {
  startAuthLoading,
  userLoggedIn,
  userLoggedOut,
  emailVerificationPending,
  emailVerified,
} from '../store/auth/authSlice';
import { AxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  signUpUser,
  verifyUser,
} from '../api/authApi';

export const useAuthStore = () => {
  const { status, errorMessage, user } = useAppSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const startLogin = async (user: LoginUserType) => {
    dispatch(startAuthLoading());

    try {
      const data: LoginUserResponse = await loginUser(user);
      dispatch(userLoggedIn(data.user));

      navigate('/');
    } catch (error) {
      console.error({ error });
      if (error instanceof AxiosError) {
        dispatch(
          userLoggedOut(
            error.response?.data?.message ||
              'Something went wrong trying to login in'
          )
        );
      } else {
        dispatch(userLoggedOut('An unknown error occurred.'));
      }
    }
  };

  const startSignUp = async (user: SignUpUserType) => {
    dispatch(startAuthLoading());

    try {
      const data: BasicResponse = await signUpUser(user);
      dispatch(emailVerificationPending(data.message));
      navigate('/verification');
    } catch (error) {
      console.error({ error });
      if (error instanceof AxiosError) {
        dispatch(
          userLoggedOut(
            error.response?.data?.message ||
              'Something went wrong trying to sing up'
          )
        );
      } else {
        dispatch(userLoggedOut('An unknown error occurred.'));
      }
    }
  };

  const startVerificationEmail = async ({
    verificationCode,
  }: EmailVerificationType) => {
    dispatch(startAuthLoading());
    try {
      const data: BasicResponse = await verifyUser({ verificationCode });
      dispatch(emailVerified(data.message));
      navigate('/login');
    } catch (error) {
      console.error({ error });
      if (error instanceof AxiosError) {
        dispatch(
          userLoggedOut(
            error.response?.data?.message ||
              'Something went wrong trying to verify the email'
          )
        );
      } else {
        dispatch(userLoggedOut('An unknown error occurred.'));
      }
    }
  };

  const startLogOut = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    }
    dispatch(userLoggedOut());
  };

  const checkAuthToken = async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        dispatch(userLoggedIn(user));
        navigate(location.pathname || '/');
      } else {
        dispatch(userLoggedOut());
      }
    } catch (error) {
      dispatch(userLoggedOut());
    }
  };

  return {
    status,
    errorMessage,
    user,
    startLogin,
    startSignUp,
    startLogOut,
    startVerificationEmail,
    checkAuthToken,
  };
};
