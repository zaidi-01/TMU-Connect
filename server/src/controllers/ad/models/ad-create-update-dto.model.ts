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
 *         imageData:
 *           type: string
 *           format: binary
 *           description: The image data of the ad
 *           example: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QA6RXhpZgAATU0AKgAAAAgAA1EQAAEAAAABAQAAAFERAAQAAAABAAABAgERAAQAAAABAAABAgE..."
 *       required:
 *         - type
 *         - title
 *         - description
 *         - price
 */
// TODO: Check and update swagger example for imageData and price
interface AdCreateUpdateDto {
  /** The type of the ad. */
  type: AdType;
  /** The title of the ad. */
  title: string;
  /** The description of the ad. */
  description: string;
  /** The price of the ad. */
  price: string;
  /** The image data of the ad. */
  image?: string;
}

export default AdCreateUpdateDto;
