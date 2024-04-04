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
 *         description: User id.
 *         schema:
 *           example: 1
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
 *         description: Number of users to take.
 *         schema:
 *           example: 10
 *           type: integer
 *       - in: query
 *         name: skip
 *         required: true
 *         description: Number of users to skip.
 *         schema:
 *           example: 0
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

/**
 * Update user role route.
 *
 * @swagger
 * /user/{id}/role:
 *   put:
 *     summary: Update user role.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User id.
 *         schema:
 *           example: 1
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 $ref: "#/components/schemas/UserRole"
 *     responses:
 *       200:
 *         description: User role updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserDto"
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: User not found.
 */
router.put(
  RELATIVE_ROUTES.USER.UPDATE_ROLE,
  allow(UserRole.ADMIN),
  userController.updateUserRole
);

export default router;
