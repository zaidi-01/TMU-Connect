/**
 * User DTO model.
 */
class UserDto {
  constructor({ id, name, email, role }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}

export default UserDto;
