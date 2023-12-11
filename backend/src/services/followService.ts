import prisma from '../database/databaseApi';

type UsersIds = {
  followeeId: string;
  followerId: string;
};

export const createAFollow = async ({ followeeId, followerId }: UsersIds) => {
  return await prisma.follow.create({
    data: {
      followee: {
        connect: { id: followeeId },
      },
      follower: {
        connect: { id: followerId },
      },
    },
  });
};

export const removeAFollow = async ({ followeeId, followerId }: UsersIds) => {
  return await prisma.follow.deleteMany({
    where: {
      followeeId,
      followerId,
    },
  });
};
