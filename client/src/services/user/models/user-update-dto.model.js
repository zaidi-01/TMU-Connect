import { UserRole } from "@/enums";

/**
 * User update DTO model.
 */
class UserUpdateDto {
  /**
   * Initializes the user update DTO model.
   * @param {string} name User's name.
   * @param {string} email User's email.
   * @param {keyof UserRole} role User's role.
   */
  constructor(name, email, role = UserRole.USER) {
    this.name = name;
    this.email = email;
    this.role = role;
  }
}

export default UserUpdateDto;
