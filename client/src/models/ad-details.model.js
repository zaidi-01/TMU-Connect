/**
 * Ad details model.
 */
class AdDetails {
  /**
   * Initializes a new instance of the AdDetails class.
   * @param {number} id
   * @param {string} title
   * @param {string} description
   * @param {number} price
   * @param {number} userId
   */
  constructor(id, title, description, price, userId) {
    /**
     * Ad ID.
     * @type {number}
     */
    this.id = id;
    /**
     * Ad title.
     * @type {string}
     */
    this.title = title;
    /**
     * Ad description.
     * @type {string}
     */
    this.description = description;
    /**
     * Ad price.
     * @type {number}
     */
    this.price = price;
    /**
     * Ad user ID.
     * @type {number}
     */
    this.userId = userId;
  }
}

export default AdDetails;
