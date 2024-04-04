/* eslint-disable no-unused-vars */
import { User } from "@/models";
import axios, { AxiosResponse } from "axios";
import * as authService from "../auth/auth.service";
import { UserDto } from "./models";
import { UserRole } from "@/enums";
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
export async function getCurrentUser() {
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

  return user;
}

/**
 * Updates the current user.
 * @param {User} user The updated user.
 * @returns {Promise<User>} The updated user.
 */
export async function updateCurrentUser(user) {
  /** @type {AxiosResponse<UserDto>} */
  const response = await http.put("/", user);
  const newUser = new User(
    response.data.id,
    response.data.name,
    response.data.email,
    response.data.role
  );

  user = new Promise((resolve) => resolve(newUser));

  return user;
}

/**
 * Get users.
 * @param {number} take Number of users to take.
 * @param {number} skip Number of users to skip.
 * @returns {Promise<User[]>} Users.
 */
export async function getUsers(take, skip) {
  if (!(await authService.isAdmin())) {
    return;
  }

  /** @type {AxiosResponse<UserDto[]>} */
  const response = await http.get("/search", {
    params: {
      take,
      skip,
    },
  });

  return response.data.map(
    (user) => new User(user.id, user.name, user.email, user.role)
  );
}

/**
 * Delete a user.
 * @param {number} id User ID.
 * @returns {Promise<void>} Empty promise.
 */
export async function deleteUser(id) {
  if (!(await authService.isAdmin()) || (await getCurrentUser()).id === id) {
    return;
  }

  await http.delete(`/${id}`);
}

/**
 * Update user role.
 * @param {number} id User ID.
 * @param {keyof UserRole} role User role.
 * @returns {Promise<void>} Empty promise.
 */
export async function updateUserRole(id, role) {
  if (!(await authService.isAdmin()) || (await getCurrentUser()).id === id) {
    return;
  }

  await http.put(`/${id}/role`, { role });
}
