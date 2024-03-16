import { RELATIVE_ROUTES } from "@contants";
import { authController } from "@controllers";
import { authenticate } from "@middlewares";
import express from "express";

/** Express router */
const router = express.Router();

/** Auth routes */

/**
 * Register route
 *
 * @swagger
 *  /auth/register:
 *    post:
 *      summary: Register a new user
 *      description: Register a new user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Register'
 *      responses:
 *        201:
 *          description: User created
 *        400:
 *          description: Bad request
 */
router.post(RELATIVE_ROUTES.AUTH.REGISTER, authController.register);

/**
 * Login route
 *
 * @swagger
 *  /auth/login:
 *    post:
 *      summary: Login
 *      description: Login
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  description: User's email
 *                  example: john.doe@domain.com
 *                password:
 *                  type: string
 *                  description: User's password
 *                  example: P@ssw0rd
 *              required:
 *                - email
 *                - password
 *      responses:
 *        200:
 *          description: User logged in
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                    description: User's token
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM0MzIwNzIyfQ.5
 *                required:
 *                  - token
 *        400:
 *          description: Bad request
 */
// TODO: Add login and token response interfaces for swagger.
router.post(
  RELATIVE_ROUTES.AUTH.LOGIN,
  authenticate("local"),
  authController.login
);

export default router;
