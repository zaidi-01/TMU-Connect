import { RELATIVE_ROUTES } from "@contants";
import { adController } from "@controllers";
import express from "express";

/** Express router */
const router = express.Router();

/** Ad routes */

/**
 * Create an ad
 *
 * @swagger
 * /ad:
 *   post:
 *     summary: Create an ad
 *     tags: [Ad]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/AdCreateDto"
 *     responses:
 *       201:
 *         description: Ad created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AdDetailsDto"
 */
router.post(RELATIVE_ROUTES.AD.CREATE, adController.createAd);

/**
 * Get ad details
 *
 * @swagger
 * /ad/{id}:
 *   get:
 *     summary: Get ad details
 *     tags: [Ad]
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
