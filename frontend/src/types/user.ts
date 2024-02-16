import { z } from 'zod';
import {
  loginUserSchema,
  signUpUserSchema,
} from '../schemas/authSchemas';
import { Post } from './post';

export type LoginUserType = z.infer<typeof loginUserSchema>;
export type SignUpUserType = z.infer<typeof signUpUserSchema>;

export type User = {
  fullName: string;
  username: string;
  email: string;
  profilePhoto: string;
  id: string;
};

export type SimpleProfile = {
  fullName: string;
  username: string;
  id: string;
  profilePhoto: string;
  isFollowing?: boolean;
};

export type Follow = {
  createAt: string;
  followerId: string;
  followeeId: string;
};

export type Profile = {
  username: string;
  fullName: string;
  profilePhoto?: string;
  description?: string;
  posts: Post[];
  followers: Follow[];
  followees: Follow[];
  _count: Quantities;
};

type Quantities = {
  followers: number;
  followees: number;
  posts: number;
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
