import { COOKIE_NAME } from "@contants";
import { PrismaClient, User } from "@prisma/client";
import { Password } from "@utilities";
import { Request, Response } from "express";
import { default as asyncHandler } from "express-async-handler";
import jwt from "jsonwebtoken";
import { RegisterDto } from "./models";

/** Prisma client */
const prisma = new PrismaClient();

/** Auth controller */

/**
 * Check if the user is authenticated.
 *
 * @param req Request.
 * @param res Response.
 */
export const isAuthenticated = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401).end();
    return;
  }

  res.status(200).end();
});

/**
 * Register a new user.
 *
 * @param req Request.
 * @param res Response.
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body as RegisterDto;
  const hashedPassword = await Password.hashPassword(password);

  // TODO: Add input validation

  await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    } as User,
  });

  res.status(201).end();
});

/**
 * Login a user.
 *
 * @param req Request.
 * @param res Response.
 */
export const login = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(400);
    throw new Error("Invalid email or password.");
  }

  req.logIn(req.user, { session: false }, (error) => {
    if (error) {
      res.status(400);
      throw error;
    }

    // TODO: Implement a better way to store the token along with a refresh token.
    // TODO: Implement encryption for the token.
    // TODO: Add configuration options for the token.
    // TODO: Change this secret to something more secure or add a provider for secret.
    const accessToken = jwt.sign({ id: (req.user as User).id }, "secret");

    res
      .cookie(COOKIE_NAME, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .sendStatus(200);
  });
});

/**
 * Logout a user.
 *
 * @param req Request.
 * @param res Response.
 */
export const logout = asyncHandler(async (_, res) => {
  res.clearCookie(COOKIE_NAME).sendStatus(200);
});
