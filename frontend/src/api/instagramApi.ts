import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';
import {
  LoginUserType,
  LoginUserResponse,
  GetUserResponse,
} from '../types/user';

const { VITE_API_URL } = getEnvVariables();

const instagramApi = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
});

instagramApi.defaults.headers.common['Content-Type'] = 'application/json';

export const loginUser = async ({ identifier, password }: LoginUserType) => {
  const { data } = await instagramApi.post<LoginUserResponse>('/users/login', {
    identifier,
    password,
  });
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await instagramApi.get<GetUserResponse>('/users/me');

  return data.user;
};

export default instagramApi;
