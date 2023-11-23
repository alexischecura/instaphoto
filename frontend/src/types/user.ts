import { z } from 'zod';
import { loginUserSchema } from '../schemas/authSchemas';

export type LoginUserType = z.infer<typeof loginUserSchema>;

export type User = {
  fullName: string;
  username: string;
  email: string;
  profilePhoto: string;
};

export type LoginUserResponse = {
  user: User;
  token: string;
};
