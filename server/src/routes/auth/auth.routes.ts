import { RELATIVE_ROUTES } from "@contants";
import { authController } from "@controllers";
import { authenticate } from "@middlewares";
import express from "express";

/** Express router */
const router = express.Router();

/** Auth routes */

/**
 * Is authenticated route.
 *
 * @swagger
 * /auth:
 *   get:
 *     summary: Check if user is authenticated
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User is authenticated
 *       401:
 *         description: Unauthorized
 */
router.get(RELATIVE_ROUTES.AUTH.BASE, authController.isAuthenticated);

/**
 * Register route.
 *
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/RegisterDto"
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad request
 */
router.post(RELATIVE_ROUTES.AUTH.REGISTER, authController.register);

/**
 * Login route.
 *
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *                 example: john.doe@domain.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: P@ssw0rd
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in
 *       400:
 *         description: Bad request
 */
// TODO: Add login interface for swagger.
router.post(
  RELATIVE_ROUTES.AUTH.LOGIN,
  authenticate("local"),
  authController.login
);

/**
 * Logout route.
 *
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out
 */
router.post(RELATIVE_ROUTES.AUTH.LOGOUT, authController.logout);

export default router;
