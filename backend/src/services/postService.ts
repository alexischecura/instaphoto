import { Prisma } from '@prisma/client';
import prisma from '../database/databaseApi';

export const createPost = async (
  postInput: Prisma.PostCreateWithoutUserInput,
  userId: string,
  tags: string[] = []
) => {
  return await prisma.post.create({
    data: {
      ...postInput,
      tags: {
        connectOrCreate: tags.map((tag) => {
          return {
            where: {
              tag_name: tag,
            },
            create: {
              tag_name: tag,
            },
          };
        }),
      },
      user: {
        connect: { id: userId },
      },
    },
  });
};

export const getUsersPost = async (
  usersIds: string[] = [],
  limit: number = 5,
  skip: number = 0
) => {
  return await prisma.post.findMany({
    where: {
      userId: { in: usersIds },
    },
    take: limit,
    skip,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
      likes: true,
    },
  });
};

export const likePost = async (userId: string, postId: string) => {
  return await prisma.like.create({
    data: {
      post: {
        connect: {
          id: postId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export const removeLikePost = async (userId: string, postId: string) => {
  return await prisma.like.delete({
    where: {
      postId,
      userId,
    },
  });
};

export const getLikePost = async (userId: string, postId: string) => {
  return await prisma.like.findUnique({
    where: {
      postId,
      userId,
    },
  });
};

export const commentPost = async (
  comment: string,
  userId: string,
  postId: string
) => {
  return await prisma.comment.create({
    data: {
      comment,
      post: {
        connect: {
          id: postId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
    include: {
      user: {
        select: {
          fullName: true,
          username: true,
        },
      },
    },
  });
};
