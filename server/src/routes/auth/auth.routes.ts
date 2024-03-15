import { RELATIVE_ROUTES } from "@contants";
import { authenticate } from "@middlewares";
import { PrismaClient, User } from "@prisma/client";
import { Password } from "@utilities";
import express from "express";
import jwt from "jsonwebtoken";
import { Register } from "./interfaces";

/** Express router */
const router = express.Router();

/** Prisma client */
const prisma = new PrismaClient();

/** Auth routes */

router.post(RELATIVE_ROUTES.AUTH.REGISTER, async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400);
  }
});

router.post(RELATIVE_ROUTES.AUTH.LOGIN, authenticate("local"), (req, res) => {
  if (!req.user) {
    res.status(400).send("Invalid email or password.");
    return;
  }

  req.logIn(req.user, { session: false }, (error) => {
    if (error) {
      res.status(400);
      return;
    }

    // TODO: Implement a better way to store the token along with a refresh token.
    // TODO: Implement encryption for the token.
    // TODO: Add configuration options for the token.
    // TODO: Change this secret to something more secure or add a provider for secret.
    const token = jwt.sign({ id: (req.user as User).id }, "secret");
    res.json({ token });
  });
});

export default router;
