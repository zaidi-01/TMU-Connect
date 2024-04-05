import FilterOptions from "./filter-options.model";

/**
 * The data transfer object for searching ads.
 *
 * @swagger
 * components:
 *   schemas:
 *     AdSearchDto:
 *       type: object
 *       properties:
 *         take:
 *           description: The number of ads to take.
 *           type: integer
 *           example: 10
 *         skip:
 *           description: The number of ads to skip.
 *           type: integer
 *           example: 20
 *         filterOptions:
 *           $ref: "#/components/schemas/FilterOptions"
 *           example:
 *             query: "car"
 *             minPrice: 100`
 *             maxPrice: 1000
 *             types:
 *               - "SALE"
 *               - "WANTED"
 *         sortOptions:
 *           $ref: "#/components/schemas/SortOptions"
 *           example:
 *             field: "PRICE"
 *             order: "ASC"
 *       required:
 *         - take
 *         - skip
 */
interface AdSearchDto {
  /**
   * The number of ads to take.
   */
  take: number;
  /**
   * The number of ads to skip.
   */
  skip: number;
  /**
   * The filter options.
   */
  filterOptions?: FilterOptions;
  /**
   * The sort options.
   */
  sortOptions?: SortOptions;
}

export default AdSearchDto;
