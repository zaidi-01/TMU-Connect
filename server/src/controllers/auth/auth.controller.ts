import { COOKIE_NAME } from "@constants";
import { PrismaClient, User, UserRole } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Password } from "@utilities";
import { Request, Response } from "express";
import { default as asyncHandler } from "express-async-handler";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { RegisterDto } from "./models";

/* Prisma client */
const prisma = new PrismaClient();

/* Auth controller */

seedAdminUser();

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

  if (!name || !email || !password) {
    throw createHttpError(400, "Missing required fields");
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@torontomu.ca$/;

  if (!emailRegex.test(email)) {
    throw createHttpError(400, "Must have a valid torontomu.ca email");
  }

  const hashedPassword = await Password.hashPassword(password);

  try {
    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      } as User,
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw createHttpError(400, "Email already exists");
    }

    throw error;
  }

  res.status(201).end();
});

/**
 * Login a user.
 *
 * @param req Request.
 * @param res Response.
 */
export const login = asyncHandler(async (req, res) => {
  req.logIn(req.user!, { session: false }, (error) => {
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
        secure: process.env.SSL === "true",
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

/**
 * Seed the database with a default admin user if it doesn't exist.
 * TODO: Read admin credentials from environment variables.
 */
async function seedAdminUser() {
  const hashedPassword = await Password.hashPassword("admin");

  try {
    await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@torontomu.ca",
        password: hashedPassword,
        role: UserRole.ADMIN,
      } as User,
    });
    console.debug("Admin user created");
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      console.debug("Admin user already exists");
    }
  }
}
