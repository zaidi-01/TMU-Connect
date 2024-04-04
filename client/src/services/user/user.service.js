/* eslint-disable no-unused-vars */
import axios from "axios";
import { UserDto, UserUpdateDto } from "./models";
import { User } from "@/models";
import { AxiosResponse } from "axios";
/* eslint-enable no-unused-vars */

// TODO: Use HTTP service once it's implemented.
const http = axios.create({
  baseURL: "/api/user",
});

/**
 * The user.
 * @type {Promise<User>}
 */
let user = null;

/**
 * Gets the current user.
 * @returns {Promise<User>} The user.
 */
export const getCurrentUser = async () => {
  if (user) {
    return user;
  }

  /** @type {AxiosResponse<UserDto>} */
  const response = await http.get("/");
  const newUser = new User(
    response.data.id,
    response.data.name,
    response.data.email,
    response.data.role
  );

  user = new Promise((resolve) => resolve(newUser));

  return newUser;
};

/**
 * Updates the current user.
 * @param {UserUpdateDto} user The updated user.
 * @returns {Promise<UserDto>} The updated user.
 */
export const updateCurrentUser = async (user) => {
  /** @type {AxiosResponse<UserDto>} */
  const response = await http.put("/", user);
  const newUser = new User(
    response.data.id,
    response.data.name,
    response.data.email,
    response.data.role
  );

  user = new Promise((resolve) => resolve(newUser));

  return newUser;
};
