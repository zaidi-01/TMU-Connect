/**
 * Token interface
 *
 * @swagger
 *  components:
 *    schemas:
 *      Token:
 *        type: object
 *        properties:
 *          accessToken:
 *            type: string
 *            description: User's token
 *            example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM0MzIwNzIyfQ.5
 *        required:
 *          - accessToken
 */
export interface Token {
  /** User's token */
  accessToken: string;
}

export default Token;
