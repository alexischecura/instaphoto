import {
  GetUserResponse,
  LoginUserResponse,
  LoginUserType,
  SignUpUserType,
} from '../types/user';
import instaphotoApi from './instaphotoApi';

export const loginUser = async ({ identifier, password }: LoginUserType) => {
  const { data } = await instaphotoApi.post<LoginUserResponse>('/users/login', {
    identifier,
    password,
  });
  return data;
};

export const signUpUser = async (user: SignUpUserType) => {
  const { data } = await instaphotoApi.post<LoginUserResponse>(
    '/users/signup',
    user
  );
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await instaphotoApi.get<GetUserResponse>('/users/me');

  return data.user;
};

export const logoutUser = async () => {
  await instaphotoApi.post('/users/logout');
};
