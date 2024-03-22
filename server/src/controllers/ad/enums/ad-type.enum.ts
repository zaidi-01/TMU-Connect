/**
 * Represents the type of an ad.
 *
 * @swagger
 * components:
 *   schemas:
 *     AdType:
 *       type: string
 *       enum:
 *         - SALE
 *         - WANTED
 *         - SERVICE
 */
enum AdType {
  /** The ad is for a sale. */
  SALE = "SALE",
  /** The ad is for a purchase. */
  WANTED = "WANTED",
  /** The ad is for a service. */
  SERVICE = "SERVICE",
}

export default AdType;
