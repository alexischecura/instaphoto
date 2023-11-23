import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';
import { LoginUserType, LoginUserResponse } from '../types/user';

const { VITE_API_URL } = getEnvVariables();

const instagramApi = axios.create({
  baseURL: VITE_API_URL,
});

export const loginUser = async ({ identifier, password }: LoginUserType) => {
  const { data } = await instagramApi.post('/users/login', {
    identifier,
    password,
  });
  return data as LoginUserResponse;
};

export default instagramApi;
