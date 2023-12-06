import { User, Prisma } from '@prisma/client';
import prisma from '../database/databaseApi';

export const createUser = async (input: Prisma.UserCreateInput) => {
  return (await prisma.user.create({
    data: input,
  })) as User;
};
type FindUniqueUser = {
  where: Prisma.UserWhereUniqueInput;
  select?: Prisma.UserSelect;
  include?: Prisma.UserInclude;
};
export const findUniqueUser = async ({ where, select }: FindUniqueUser) => {
  return await prisma.user.findUnique({
    where: { ...where, active: true },
    select,
  });
};

type FindUser = {
  where?: Prisma.UserWhereInput;
  select?: Prisma.UserSelect;
  include?: Prisma.UserInclude;
};

type FindUserFollowers = {
  where?: Prisma.UserWhereInput;
};

export const findUserWithFollowers = async ({
  where,
}: FindUserFollowers = {}) => {
  return await prisma.user.findFirst({
    where: { ...where, active: true },
    include: {
      followees: {
        select: { followerId: true },
      },
    },
  });
};

export const findUser = async ({ where, select, include }: FindUser = {}) => {
  return await prisma.user.findFirst({
    where: { ...where, active: true },
    select,
  });
};

export const findUserByEmailOrUsername = async (identifier: string) => {
  return await prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
      AND: [{ active: true }],
    },
  });
};

type FindManyUsers = {
  excludedIds?: string[];
  limit?: number;
  select?: Prisma.UserSelect;
};

export const findManyUsers = async ({
  excludedIds = [],
  select,
  limit = 5,
}: FindManyUsers) => {
  return await prisma.user.findMany({
    take: limit,
    select,
    where: {
      id: {
        notIn: excludedIds,
      },
    },
  });
};

export const updateUser = async (
  where: Prisma.UserWhereUniqueInput,
  input: Prisma.UserUpdateInput
) => {
  return await prisma.user.update({ where, data: input });
};

export const createManyUsers = async (input: Prisma.UserCreateManyInput[]) => {
  const usersToInsert = input.map((user) => ({ ...user, verified: true }));

  return await prisma.user.createMany({
    data: usersToInsert,
    skipDuplicates: true,
  });
};
