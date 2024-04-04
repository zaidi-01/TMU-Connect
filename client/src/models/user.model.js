/* eslint-disable no-unused-vars */
import { UserRole } from "@/enums";
/* eslint-enable no-unused-vars */

/**
 * User model.
 */
class User {
  /**
   * Initialize the user model.
   * @param {number} id User's ID.
   * @param {string} name User's name.
   * @param {string} email User's email.
   * @param {UserRole} role User's role.
   */
  constructor(id, name, email, role) {
    /**
     * User's ID.
     * @type {number}
     */
    this.id = id;
    /**
     * User's name.
     * @type {string}
     */
    this.name = name;
    /**
     * User's email.
     * @type {string}
     */
    this.email = email;
    /**
     * User's role.
     * @type {UserRole}
     */
    this.role = role;
  }
}

export default User;
