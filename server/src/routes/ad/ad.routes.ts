import { RELATIVE_ROUTES } from "@contants";
import { adController } from "@controllers";
import express from "express";

/** Express router */
const router = express.Router();

/** Ad routes */

/**
 * Get ad details
 *
 * @swagger
 * /ad/{id}:
 *   get:
 *     tags:
 *       - Ad
 *     description: Get ad details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ad details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AdDetailsDto"
 *       404:
 *         description: Ad not found
 */
router.get(RELATIVE_ROUTES.AD.DETAILS, adController.getAdDetails);

export default router;
