import { UserRole } from "@enums";

/**
 * Represents a user update data transfer object.
 *
 * @swagger
 * components:
 *   schemas:
 *     UserUpdateDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: User's name
 *           example: John Doe
 *         email:
 *           type: string
 *           description: User's email
 *           example: john.doe@torontomu.ca
 *         role:
 *           $ref: "#/components/schemas/UserRole"
 */
interface UserUpdateDto {
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

export default UserUpdateDto;
