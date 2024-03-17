import { UserRole } from "@enums";

/**
 * Represents a user.
 *
 * @swagger
 * components:
 *   schemas:
 *     UserDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: User's id
 *           example: 1
 *         name:
 *           type: string
 *           description: User's name
 *           example: John Doe
 *         email:
 *           type: string
 *           description: User's email
 *           example: john.doe@domain.com
 *         role:
 *           $ref: "#/components/schemas/UserRole"
 *       required:
 *         - id
 *         - name
 *         - email
 *         - role
 */
interface UserDto {
  /**
   * User's id
   */
  id: number;
  /**
   * User's name
   */
  name: string;
  /**
   * User's email
   */
  email: string;
  /**
   * User's role
   */
  role: UserRole;
}

export default UserDto;
