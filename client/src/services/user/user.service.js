import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { UserDto, UserUpdateDto } from "./models";

// TODO: Use HTTP service once it's implemented.
const http = axios.create({
  baseURL: "/api/user",
});

/**
 * The user.
 * @type {Promise<UserDto>}
 */
let user = null;

/**
 * Gets the current user.
 * @returns {Promise<UserDto>} The user.
 */
export const getCurrentUser = async () => {
  if (user) {
    return user;
  }

  const response = await http.get("/");
  user = new Promise((resolve) => resolve(response.data));

  return user;
};

/**
 * Updates the current user.
 * @param {UserUpdateDto} user The updated user.
 * @returns {Promise<UserDto>} The updated user.
 */
export const updateCurrentUser = async (user) => {
  const response = await http.put("/", user);
  user = new Promise((resolve) => resolve(response.data));

  return response.data;
};
