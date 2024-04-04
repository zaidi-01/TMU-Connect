import { RELATIVE_ROUTES } from "@constants";
import { userController } from "@controllers";
import { UserRole } from "@enums";
import { allow } from "@middlewares";
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

/**
 * Delete current user route.
 *
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete user by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: User not found.
 */
router.delete(
  RELATIVE_ROUTES.USER.DELETE,
  allow(UserRole.ADMIN),
  userController.deleteUser
);

/**
 * Search users route.
 *
 * @swagger
 * /user/search:
 *   get:
 *     summary: Search users.
 *     parameters:
 *       - in: query
 *         name: take
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: skip
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Users found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/UserDto"
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */
router.get(
  RELATIVE_ROUTES.USER.SEARCH,
  allow(UserRole.ADMIN),
  userController.searchUsers
);

export default router;
