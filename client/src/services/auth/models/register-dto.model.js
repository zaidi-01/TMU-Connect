/**
 * Register DTO model.
 */
class RegisterDto {
  /**
   * Initializes the register DTO model.
   * @param {string} name User's name.
   * @param {string} email User's email.
   * @param {string} password User's password.
   */
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export default RegisterDto;
