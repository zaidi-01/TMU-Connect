import { UserRole } from "@enums";
import { UserDto } from "@models";
import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import { default as asyncHandler } from "express-async-handler";
import { UserUpdateDto } from "./models";

/** Prisma client */

const prisma = new PrismaClient();

/** User controller */

/**
 * Get current user info.
 * @param req Request.
 * @param res Response.
 */
export const getCurrentUserInfo = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user as User;
    const userDto: UserDto = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as UserRole,
    };

    res.status(200).json(userDto);
  }
);

/**
 * Update current user info.
 * @param req Request.
 * @param res Response.
 */
export const updateCurrentUserInfo = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user as UserDto;
    const { name, email } = req.body as UserUpdateDto;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: name || user.name,
        email: email || user.email,
      },
    });
    const userDto: UserDto = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role as UserRole,
    };

    res.status(200).json(userDto);
  }
);

/**
 * Delete user.
 * @param req Request.
 * @param res Response.
 */
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const currentId = (req.user as User).id;

  if (id === currentId) {
    res.sendStatus(400);
    return;
  }

  const user = await prisma.user.delete({
    where: { id },
  });

  if (!user) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(200);
});

/**
 * Search users.
 * @param req Request.
 * @param res Response.
 */
export const searchUsers = asyncHandler(async (req: Request, res: Response) => {
  const { take, skip } = req.query;

  if (!take || !skip) {
    res.sendStatus(400);
    return;
  }

  const users = await prisma.user.findMany({
    take: parseInt(take as string),
    skip: parseInt(skip as string),
  });

  res.status(200).json(users);
});
