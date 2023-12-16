import { User } from './user';

type Like = {
  id: string;
  userId: string;
  postId: string;
};

export type Post = {
  id: string;
  photoUrl: string;
  content: string;
  createdAt: string;
  userId: string;
  likes: Like[] | [];
  user?: User;
};
