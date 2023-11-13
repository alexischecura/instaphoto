import { PrismaClient, User, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (input: Prisma.UserCreateInput) => {
  return (await prisma.user.create({
    data: input,
  })) as User;
};
export const findUser = async (where: Prisma.UserWhereUniqueInput) => {
  return await prisma.user.findUnique({ where });
};

export const updateUser = async (
  where: Prisma.UserWhereUniqueInput,
  input: Prisma.UserUpdateInput
) => {
  return await prisma.user.update({ where, data: input });
};
