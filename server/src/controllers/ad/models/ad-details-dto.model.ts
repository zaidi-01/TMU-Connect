import { AdType } from "../enums";

/**
 * Represents the details of an ad.
 *
 * @swagger
 * components:
 *   schemas:
 *     AdDetailsDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ID of the ad
 *           example: 1
 *         type:
 *           $ref: "#/components/schemas/AdType"
 *         title:
 *           type: string
 *           description: The title of the ad
 *           example: "Car for sale"
 *         description:
 *           type: string
 *           description: The description of the ad
 *           example: "A car in great condition"
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the ad
 *           example: 8499.99
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-03-17T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-03-17T12:00:00Z"
 *         userId:
 *           type: integer
 *           description: The ID of the user who created the ad
 *           example: 1
 *       required:
 *         - id
 *         - type
 *         - title
 *         - description
 *         - createdAt
 *         - updatedAt
 *         - userId
 */
interface AdDetailsDto {
  /** The ID of the ad. */
  id: number;
  /** The type of the ad. */
  type: AdType;
  /** The title of the ad. */
  title: string;
  /** The description of the ad. */
  description: string;
  /** The price of the ad. */
  price: number | undefined;
  /** The date when the ad was created. */
  createdAt: Date;
  /** The date when the ad was last updated. */
  updatedAt: Date;
  /** The ID of the user who created the ad. */
  userId: number;
}

export default AdDetailsDto;
