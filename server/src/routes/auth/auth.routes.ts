import { RELATIVE_ROUTES } from "@contants";
import { PrismaClient } from "@prisma/client";
import { Password } from "@utilities";
import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
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

router.post(
  RELATIVE_ROUTES.AUTH.LOGIN,
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (!req.user) {
      res.status(400).send("Invalid email or password.");
    }

    req.logIn(req.user!, { session: false }, (error) => {
      if (error) {
        res.status(400);
      }

      // TODO: Implement a better way to store the token along with a refresh token.
      // TODO: Implement encryption for the token.
      // TODO: Add configuration options for the token.
      // TODO: Change this secret to something more secure or add a provider for secret.
      const token = jwt.sign(req.user!, "secret");
      res.json({ token });
    });
  }
);

export default router;
