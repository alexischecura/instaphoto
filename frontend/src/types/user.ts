import { z } from 'zod';
import { loginUserSchema, signUpUserSchema } from '../schemas/authSchemas';

export type LoginUserType = z.infer<typeof loginUserSchema>;
export type SignUpUserType = z.infer<typeof signUpUserSchema>;

export type User = {
  fullName: string;
  username: string;
  email: string;
  profilePhoto: string;
};

export type SignUpUserResponse = {
  status: string;
  message: string;
};

export type LoginUserResponse = {
  user: User;
  token: string;
};

export type GetUserResponse = {
  user: User;
};
