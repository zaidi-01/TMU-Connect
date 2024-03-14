import { RELATIVE_ROUTES } from "@contants";
import { PrismaClient } from "@prisma/client";
import { Password } from "@utilities";
import express from "express";
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

export default router;
