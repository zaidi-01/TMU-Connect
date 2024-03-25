/**
 * Interface for registration
 * 
 * @swagger
 *  components:
 *    schemas:
 *      RegisterDto:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            description: User's name
 *            example: John Doe
 *          email:
 *            type: string
 *            description: User's email
 *            example: john.doe@domain.com
 *          password:
 *            type: string
 *            description: User's password
 *            example: P@ssw0rd
 *        required:
 *          - name
 *          - email
 *          - password
 */
interface RegisterDto {
  /**
   * User's name
   */
  name: string;
  /**
   * User's email
   */
  email: string;
  /**
   * User's password
   */
  password: string;
}

export default RegisterDto;
