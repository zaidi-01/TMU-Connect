import { RELATIVE_ROUTES } from "@constants";
import { adController } from "@controllers";
import express from "express";

/** Express router */
const router = express.Router();

/** Ad routes */

// TODO: Add error responses for all routes.

/**
 * Create an ad.
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
 * Update an ad.
 *
 * @swagger
 * /ad/{id}:
 *   put:
 *     summary: Update an ad
 *     tags: [Ad]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/AdCreateDto"
 *     responses:
 *       200:
 *         description: Ad updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AdDetailsDto"
 */
router.put(RELATIVE_ROUTES.AD.UPDATE, adController.updateAd);

/**
 * Delete an ad.
 *
 * @swagger
 * /ad/{id}:
 *   delete:
 *     summary: Delete an ad
 *     tags: [Ad]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Ad deleted
 */
router.delete(RELATIVE_ROUTES.AD.DELETE, adController.deleteAd);

/**
 * Get ad details.
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

/**
 * Search ads.
 *
 * @swagger
 * /ad/search:
 *   post:
 *     summary: Search ads
 *     tags: [Ad]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/AdSearchDto"
 *     responses:
 *       200:
 *         description: Ads found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/AdDetailsDto"
 *       401:
 *         description: Unauthorized
 */
router.post(RELATIVE_ROUTES.AD.SEARCH, adController.searchAds);

export default router;
