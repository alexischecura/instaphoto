import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

const instagramApi = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
});

instagramApi.defaults.headers.common['Content-Type'] = 'application/json';

export default instagramApi;
