/**
 * Represents the roles that a user can have.
 *
 * @swagger
 * components:
 *   schemas:
 *     UserRole:
 *       type: string
 *       enum:
 *         - USER
 *         - ADMIN
 */
enum UserRole {
  /** User role */
  USER = "USER",
  /** Admin role */
  ADMIN = "ADMIN",
}

export default UserRole;
