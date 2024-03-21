import { PrismaClient, User } from "@prisma/client";
import { Password } from "@utilities";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Register, Token } from "./interfaces";
import asyncHandler = require("express-async-handler");

/** Prisma client */
const prisma = new PrismaClient();

/** Auth controller */

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body as Register;
  const hashedPassword = await Password.hashPassword(password);

  // TODO: Add input validation

  await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });

  res.status(201);
});

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
    res.json({ accessToken } as Token);
  });
});
