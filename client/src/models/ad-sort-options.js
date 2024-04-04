/**
 * Sort options for ads.
 */
class AdSortOptions {
  /**
   * Initializes the sort options.
   * @param {"PRICE" | "DATE" | "TITLE"} field Field to sort by.
   * @param {"ASC" | "DESC"} order Sort order.
   */
  constructor(field, order) {
    /**
     * Field to sort by.
     * @type {"PRICE" | "DATE" | "TITLE"}
     */
    this.field = field;
    /**
     * Sort order.
     * @type {"ASC" | "DESC"}
     */
    this.order = order;
  }
}

export default AdSortOptions;
