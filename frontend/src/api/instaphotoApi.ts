import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

const instaphotoApi = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
});

instaphotoApi.defaults.headers.common['Content-Type'] = 'application/json';

export default instaphotoApi;
