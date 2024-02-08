import {
  BasicResponse,
  EmailVerificationType,
  GetUserResponse,
  LoginUserResponse,
  LoginUserType,
  SignUpUserType,
} from '../types/user';
import instagramApi from './instagramApi';

export const loginUser = async ({ identifier, password }: LoginUserType) => {
  const { data } = await instagramApi.post<LoginUserResponse>('/users/login', {
    identifier,
    password,
  });
  return data;
};

export const signUpUser = async (user: SignUpUserType) => {
  const { data } = await instagramApi.post<BasicResponse>(
    '/users/signup',
    user
  );
  return data;
};

export const verifyUser = async ({
  verificationCode,
}: EmailVerificationType) => {
  const { data } = await instagramApi.get<BasicResponse>(
    `/users/verification/${verificationCode}`
  );
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await instagramApi.get<GetUserResponse>('/users/me');

  return data.user;
};

export const logoutUser = async () => {
  await instagramApi.post('/users/logout');
};
