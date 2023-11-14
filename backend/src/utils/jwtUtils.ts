import jwt, { SignOptions } from 'jsonwebtoken';
import { envVars } from '../configs/envConfig';

export const signJwt = (payload: Object, options: SignOptions) => {
  return jwt.sign(payload, envVars.JWT_SECRET_KEY, {
    ...(options && options),
    algorithm: 'HS256',
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const decoded = jwt.verify(token, envVars.JWT_SECRET_KEY) as T;

    return decoded;
  } catch (error) {
    return null;
  }
};
