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
  limit: number = 10,
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
