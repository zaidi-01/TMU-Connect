import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

// promisify the scrypt function
const scryptAsync = promisify(scrypt);

/**
 * Password class
 */
export class Password {
  /**
   * Hash password
   * @param password The password to hash
   * @returns The hashed password
   */
  static async hashPassword(password: string) {
    // Generate a random salt
    const salt = randomBytes(16).toString("hex");
    // Hash the password
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    // Return the hashed password and salt
    return `${buf.toString("hex")}.${salt}`;
  }

  /**
   * Compare password
   * @param storedPassword The stored password
   * @param suppliedPassword The supplied password
   * @returns A boolean indicating if the passwords match
   */
  static async comparePassword(
    storedPassword: string,
    suppliedPassword: string
  ): Promise<boolean> {
    // Destructure the stored password into hashedPassword and salt
    const [hashedPassword, salt] = storedPassword.split(".");
    // Create a buffer from the hashed password
    const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
    // Hash the new supplied password
    const suppliedPasswordBuf = (await scryptAsync(
      suppliedPassword,
      salt,
      64
    )) as Buffer;

    // Compare the two buffers
    return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
  }
}

export default Password;
