/**
 * The data transfer object for searching ads.
 *
 * @swagger
 * components:
 *   schemas:
 *     AdSearchDto:
 *       type: object
 *       properties:
 *         query:
 *           description: The search query.
 *           type: string
 *           example: "car"
 *         take:
 *           description: The number of ads to take.
 *           type: integer
 *           example: 10
 *         skip:
 *           description: The number of ads to skip.
 *           type: integer
 *           example: 20
 *       required:
 *         - take
 *         - skip
 */
interface AdSearchDto {
  /**
   * The search query.
   */
  query: string;
  /**
   * The number of ads to take.
   */
  take: number;
  /**
   * The number of ads to skip.
   */
  skip: number;
}

export default AdSearchDto;
