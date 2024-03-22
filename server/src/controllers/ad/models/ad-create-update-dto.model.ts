import { AdType } from "../enums";

/**
 * Represents the details of an ad to be created.
 *
 * @swagger
 * components:
 *   schemas:
 *     AdCreateDto:
 *       type: object
 *       properties:
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
 *       required:
 *         - type
 *         - title
 *         - description
 *         - price
 */
interface AdCreateUpdateDto {
  /** The type of the ad. */
  type: AdType;
  /** The title of the ad. */
  title: string;
  /** The description of the ad. */
  description: string;
  /** The price of the ad. */
  price: number;
}

export default AdCreateUpdateDto;
