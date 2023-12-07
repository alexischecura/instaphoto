import prisma from '../database/databaseApi';

type CreateAFollow = {
  followeeId: string;
  followerId: string;
};

export const createAFollow = async ({
  followeeId,
  followerId,
}: CreateAFollow) => {
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
