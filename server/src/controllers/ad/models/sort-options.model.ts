/**
 * The sort options.
 *
 * @swagger
 * components:
 *   schemas:
 *     SortOptions:
 *       type: object
 *       properties:
 *         field:
 *           description: The sort field.
 *           type: string
 *           enum:
 *             - "PRICE"
 *             - "DATE"
 *             - "TITLE"
 *           example: "PRICE"
 *         order:
 *           description: The sort order.
 *           type: string
 *           enum:
 *             - "ASC"
 *             - "DESC"
 *           example: "ASC"
 *       required:
 *         - field
 *         - order
 */
interface SortOptions {
  /**
   * The sort field.
   */
  field: "PRICE" | "DATE" | "TITLE";
  /**
   * The sort order.
   */
  order: "ASC" | "DESC";
}
