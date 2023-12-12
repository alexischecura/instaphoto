import { Prisma } from '@prisma/client';
import prisma from '../database/databaseApi';

export const createPost = (
  postInput: Prisma.PostCreateWithoutUserInput,
  userId: string,
  tags: string[] = []
) => {
  return prisma.post.create({
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
