import { User } from './user';

export type Like = {
  id: string;
  userId: string;
  postId: string;
};

export type Comment = {
  id: string;
  userId: string;
  postId: string;
  comment: string;
  createdAt: string;
  user: {
    fullName: string;
    username: string;
  };
};

export type Post = {
  id: string;
  photoUrl: string;
  content: string;
  createdAt: string;
  userId: string;
  likes: Like[] | [];
  comments: Comment[];
  user: User;
};
