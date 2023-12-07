import { z } from 'zod';
import {
  emailVerificationSchema,
  loginUserSchema,
  signUpUserSchema,
} from '../schemas/authSchemas';

export type LoginUserType = z.infer<typeof loginUserSchema>;
export type SignUpUserType = z.infer<typeof signUpUserSchema>;
export type EmailVerificationType = z.infer<typeof emailVerificationSchema>;

export type User = {
  fullName: string;
  username: string;
  email: string;
  profilePhoto: string;
  id: string;
};

export type Profile = {
  fullName: string;
  username: string;
  id: string;
  profilePhoto: string;
};

export type BasicResponse = {
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
