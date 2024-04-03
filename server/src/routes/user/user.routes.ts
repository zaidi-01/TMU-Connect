import { RELATIVE_ROUTES } from "@constants";
import { userController } from "@controllers";
import express from "express";

const router = express.Router();

/**
 * Get current user info route.
 *
 * @swagger
 * /user:
 *   get:
 *     summary: Get current user info.
 *     responses:
 *       200:
 *         description: Current user info.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserDto"
 *       401:
 *         description: Unauthorized.
 */
router.get(RELATIVE_ROUTES.USER.BASE, userController.getCurrentUserInfo);

/**
 * Update current user info route.
 *
 * @swagger
 * /user:
 *   put:
 *     summary: Update current user info.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserUpdateDto"
 *     responses:
 *       200:
 *         description: Updated user info.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserDto"
 *       401:
 *         description: Unauthorized.
 */
router.put(RELATIVE_ROUTES.USER.BASE, userController.updateCurrentUserInfo);

export default router;
