import { AdType } from "../enums";

/**
 * The options for filtering ads.
 *
 * @swagger
 * components:
 *   schemas:
 *     FilterOptions:
 *       type: object
 *       properties:
 *         query:
 *           description: The search query.
 *           type: string
 *           example: "car"
 *         minPrice:
 *           description: The minimum price to filter by.
 *           type: number
 *           example: 100
 *         maxPrice:
 *           description: The maximum price to filter by.
 *           type: number
 *           example: 1000
 *         types:
 *           description: The ad types to filter by.
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/AdType"
 *           example:
 *             - "SALE"
 *             - "WANTED"
 *             - "SERVICE"
 */
interface FilterOptions {
  /**
   * The search query.
   */
  query: string;
  /**
   * The minimum price.
   */
  minPrice?: number;
  /**
   * The maximum price.
   */
  maxPrice?: number;
  /**
   * The ad types to filter by.
   */
  types?: AdType[];
}

export default FilterOptions;
