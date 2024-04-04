// eslint-disable-next-line no-unused-vars
import { AdType } from "@/enums";

/**
 * Filter options for ads.
 */
class AdFilterOptions {
  /**
   * Initializes the filter options.
   * @param {string} query Search query.
   * @param {number} minPrice Minimum price.
   * @param {number} maxPrice Maximum price.
   * @param {[keyof AdType]} types Ad types.
   */
  constructor(query, minPrice, maxPrice, types) {
    /**
     * Search query.
     * @type {string}
     */
    this.query = query;
    /**
     * Minimum price.
     * @type {number}
     */
    this.minPrice = minPrice;
    /**
     * Maximum price.
     * @type {number}
     */
    this.maxPrice = maxPrice;
    /**
     * Ad types.
     * @type {[keyof AdType]}
     */
    this.types = types;
  }
}

export default AdFilterOptions;
