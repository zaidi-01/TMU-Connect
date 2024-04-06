import { UserRole } from "@/enums";
import axios from "axios";
import { BehaviorSubject, distinctUntilChanged } from "rxjs";
import * as userService from "../user/user.service";
import { RegisterDto } from "./models";

// TODO: Use HTTP service once it's implemented.
const http = axios.create({
  baseURL: "/api/auth",
});
http.interceptors.response.use(
  (response) => response,
  (error) => {
    // Set error message to response data if available
    if (error.response.data.message) {
      error.message = error.response.data.message;
    }

    return Promise.reject(error);
  }
);

const _isAuthenticated$ = new BehaviorSubject(false);
export const isAuthenticated$ = _isAuthenticated$
  .asObservable()
  .pipe(distinctUntilChanged());

/**
 * Checks if a user is authenticated.
 * @returns {Promise<boolean>} True if the user is authenticated, false otherwise.
 */
export async function isAuthenticated() {
  try {
    await http.get("/");
    _isAuthenticated$.next(true);
    return true;
  } catch {
    _isAuthenticated$.next(false);
    return false;
  }
}

/**
 * Checks if a user is an admin.
 * @returns {Promise<boolean>} True if the user is an admin, false otherwise.
 */
export async function isAdmin() {
  const user = await userService.getCurrentUser();
  return user.role === UserRole.ADMIN;
}

/**
 * Logs in a user.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {Promise} The response data.
 */
export async function login(email, password) {
  const response = await http.post("/login", { email, password });
  return response.data;
}

/**
 * Registers a user.
 * @param {string} name The user's name.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {Promise} The response data.
 */
export async function register(name, email, password) {
  const response = await http.post(
    "/register",
    new RegisterDto(name, email, password)
  );
  return response.data;
}

/**
 * Logs out a user.
 * @returns {Promise} Fulfills when the user is logged out, rejects otherwise.
 */
export async function logout() {
  return new Promise((resolve, reject) => {
    http
      .post("/logout")
      .then(() => {
        _isAuthenticated$.next(false);
        resolve();
      })
      .catch((error) => reject(error));
  });
}
