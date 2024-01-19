import { User } from './user';

export type Like = {
  id: string;
  userId: string;
  createdAt: string;
  postId: string;
};

export type LikeResponse = {
  status: string;
  action: 'like' | 'unlike';
  message: string;
  like: Like;
};

export type Comment = {
  id: string;
  userId: string;
  postId: string;
  comment: string;
  createdAt: string;
  user: {
    username: string;
  };
};

export type Post = {
  id: string;
  postPhoto: string;
  content: string;
  createdAt: string;
  userId: string;
  likes: Like[] | [];
  comments: Comment[];
  user: User;
};
